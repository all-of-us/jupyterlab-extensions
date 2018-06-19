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

def build(cmd_name, args)
  ensure_docker cmd_name, args

  common = Common.new
  common.run_inline %W{yarn install}
  common.run_inline %W{yarn lint}
  common.run_inline %W{yarn run build}
end

Common.register_command({
  :invocation => "build",
  :description => "Builds the UI for the given environment.",
  :fn => lambda { |*args| build("build", args) }
})

def clean(cmd_name)
  ensure_docker cmd_name, []

  common = Common.new
  common.run_inline %W{yarn clean}
end

Common.register_command({
  :invocation => "clean",
  :description => "Cleans the output of the build in lib.",
  :fn => lambda { |*args| clean("clean") }
})


def install(cmd_name, args)
  ensure_docker cmd_name, args
  swagger_regen("swagger-regen")
  build("build", args)
  common = Common.new
  common.run_inline %W{yarn resources}
  common.run_inline %W{jupyter labextension link . --dev}
  common.run_inline %W{cp test/all_of_us_config.json jupyterlab/.all_of_us_config.json}
end

Common.register_command({
  :invocation => "install",
  :description => "Regens, builds, and installs the extension in JupyterLab (in Docker.)"  +
      "Use this when JupyterLab is already running in another window.",
  :fn => lambda { |*args| install("install", args) }
})

def run()
  common = Common.new
  common.run_inline %W{docker-compose up jupyterlab-extensions}
end

Common.register_command({
  :invocation => "run",
  :description => "Runs JupyterLab inside Docker. Use Ctrl-C to terminate it.",
  :fn => lambda { |*args| run() }
})

def dev_up(cmd_name, args)
  common = Common.new
  common.run_inline %W{docker-compose run --rm jupyterlab-extensions ./project.rb install} + args
  run()
end

Common.register_command({
  :invocation => "dev-up",
  :description => "Regens, builds, and installs the extension; then runs Jupyter. " +
      "Use Ctrl-C to terminate it.",
  :fn => lambda { |*args| dev_up("dev-up", args) }
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
