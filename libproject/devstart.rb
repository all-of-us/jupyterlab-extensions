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
  # Not using this yet, but we will need to.
  options = BuildOptions.new.parse(cmd_name, args)

  common = Common.new
  common.run_inline %W{yarn install}
  common.run_inline %W{yarn run build}
end

Common.register_command({
  :invocation => "build",
  :description => "Builds the UI for the given environment.",
  :fn => lambda { |*args| build("build", args) }
})

def clean(cmd_name, args)
  ensure_docker cmd_name, args

  common = Common.new
  common.run_inline %W{yarn clean}
end

Common.register_command({
  :invocation => "clean",
  :description => "Cleans the output of the build in lib.",
  :fn => lambda { |*args| clean("clean", args) }
})


def install(cmd_name, args)
  ensure_docker cmd_name, args
  common = Common.new
  common.run_inline %W{jupyter labextension link .}
end

Common.register_command({
  :invocation => "install",
  :description => "Installs the extension in JupyterLab (running in Docker.)",
  :fn => lambda { |*args| install("install", args) }
})

def run(cmd_name, args)
  common = Common.new
  common.run_inline %W{docker-compose up jupyterlab-extensions}
end

Common.register_command({
  :invocation => "run",
  :description => "Runs JupyterLab inside Docker.",
  :fn => lambda { |*args| run("run", args) }
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

