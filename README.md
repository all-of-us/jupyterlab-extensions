# jupyterlab_allofus

JupyterLab extension for All of Us Jupyter notebooks.

Ruby targets in libproject/devstart.rb provide targets for building and running the code, using
Docker.

## Running and installing locally

Use the dev-up command to clean, regen, build, and install the extension and run JupyterLab in
Docker:

```
./project.rb dev-up
```

When JupyterLab has started up inside Docker, you will be able to connect to it on localhost:8007.
Hit Ctrl-C to kill it.

Once it's running, you can use the install command to rebuild and install the extension:

```
./project.rb install
```

## Other commands

To generate client libraries for talking to the workbench API based on a tagged client_api.yaml
file referenced in package.json, run:

```
./project.rb swagger-regen
```

To build the (generated and non-generated) Typescript code, and put the output Javascript in lib, run:

```
./project.rb build
```


To clean the build output, run:

```
./project.rb clean
```

To run JupyterLab without building anything, run:

```
./project.rb run
```

## Publishing JupyterLab extension

TODO: figure this out.