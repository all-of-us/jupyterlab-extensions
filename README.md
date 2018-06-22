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

Once it's running, you can use the install command to fully rebuild and install the extension:

```
./project.rb install
```

However, JupyterLab runs in "watch mode". This means that if you change a CSS file, reloading the
page in your browser will normally pick up that change automatically. If you change a TypeScript 
file, running:

```
./project.rb build
```

will cause the change to be built, with output written to the lib dir, and picked up the next time 
you reload the page in your browser. 

Since these steps are much faster than running "install", you'll normally want to do them instead
once your server is running to iterate more quickly.

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