# UI project management commands and command-line flag definitions.

require "optparse"
require "set"
require_relative "../utils/workbench"

def ensure_docker(cmd_name, args)
  unless Workbench::in_docker?
    exec *(%W{docker-compose run --rm jupyterlab-extensions ./project.rb #{cmd_name}} + args)
  end
end

# Creates a default command-line argument parser.
# command_name: For help text.
def create_parser(command_name)
  OptionParser.new do |parser|
    parser.banner = "Usage: ./project.rb #{command_name} [options]"
    parser
  end
end

def install_dependencies()
  common = Common.new
  common.run_inline %W{docker-compose run --rm jupyterlab-extensions yarn install}
end

Common.register_command({
  :invocation => "install-dependencies",
  :description => "Installs dependencies via yarn.",
  :fn => Proc.new { |*args| install_dependencies(*args) }
})

def swagger_regen(cmd_name)
  ensure_docker cmd_name, []

  common = Common.new
  common.run_inline %W{yarn run codegen}
end

Common.register_command({
  :invocation => "swagger-regen",
  :description => "Regenerates API client libraries from Swagger definitions.",
  :fn => Proc.new { |*args| swagger_regen("swagger-regen") }
})

class BuildOptions
  # Keep in sync with .angular-cli.json.
  ENV_CHOICES = %W{local-test local test staging stable}
  attr_accessor :env

  def initialize
    self.env = "dev"
  end

  def parse cmd_name, args
    parser = OptionParser.new do |parser|
      parser.banner = "Usage: ./project.rb #{cmd_name} [options]"
      parser.on(
        "--environment ENV", ENV_CHOICES,
        "Environment (default: local-test): [#{ENV_CHOICES.join(" ")}]") do |v|
        # The default environment file (called "dev" in Angular language)
        # compiles a local server to run against the deployed remote test API.
        self.env = v == "local-test" ? "dev" : v
      end
    end
    parser.parse args
    self
  end
end

def build(cmd_name, args)
  ensure_docker cmd_name, args
  options = BuildOptions.new.parse(cmd_name, args)

  common = Common.new
  common.run_inline %W{yarn install}

  # Just use --aot for "test", which catches many compilation issues. Go full
  # --prod (includes --aot) for other environments. Don't use full --prod in the
  # test environment, as it takes twice as long to compile (1m vs 2m on 4/5/18)
  # and also uglifies the source.
  # See https://github.com/angular/angular-cli/wiki/build#--dev-vs---prod-builds.
  optimize = "--aot"
  if Set['staging', 'stable'].include?(options.env)
    optimize = "--prod"
  end
  common.run_inline %W{yarn run build
    #{optimize} --environment=#{options.env} --no-watch --no-progress}
end

Common.register_command({
  :invocation => "build",
  :description => "Builds the UI for the given environment.",
  :fn => lambda { |*args| build("build", args) }
})

def run_linter()
  Common.new.run_inline %W{docker-compose run --rm jupyterlab-extensions yarn run lint}
end

Common.register_command({
  :invocation => "lint",
  :description => "Runs linter.",
  :fn => Proc.new { |*args| run_linter(*args) }
})

def rebuild_image()
  common = Common.new

  common.run_inline %W{docker-compose build}
end

Common.register_command({
  :invocation => "rebuild-image",
  :description => "Re-builds the dev docker image (necessary when Dockerfile is updated).",
  :fn => Proc.new { |*args| rebuild_image(*args) }
})

def docker_run(cmd_name, args)
  Common.new.run_inline %W{docker-compose run --rm jupyterlab-extensions} + args
end

Common.register_command({
  :invocation => "docker-run",
  :description => "Runs the specified command in a docker container.",
  :fn => lambda { |*args| docker_run("docker-run", args) }
})

