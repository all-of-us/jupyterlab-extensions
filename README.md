# jupyterlab_allofus

JupyterLab extension for All of Us Jupyter notebooks.

Ruby targets in libproject/devstart.rb provide targets for building and running the code, using
Docker.

## Building code

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

To install the code in Jupyterlab, run:
```
./project.rb install
```

## Running JupyterLab server

To run JupyterLab, run:

```
./project.rb run
```

When JupyterLab has started up inside Docker, you will be able to connect to it on localhost:8007.
Hit Ctrl-C to kill it.

## Publishing JupyterLab extension

TODO: figure this out.