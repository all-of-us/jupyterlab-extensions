FROM node:9.11.1-alpine

# We set the UID to the host's UID to ensure written files get proper permissions. The default UID
# for node is 1000, which conflicts with some of our host machines.
RUN apk --no-cache add shadow
RUN groupmod -g 666 node \
  && usermod -u 666 -g 666 node

RUN apk add --no-cache python3 && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
    if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi && \
    rm -r /root/.cache

# Java for Swagger client generation
RUN apk --no-cache add openjdk8-jre git python3-dev gcc linux-headers libc-dev alpine-sdk

RUN pip install jupyter
RUN pip install jupyterlab

# We touch yarn's config file here so that we can explicitly make sure
# yarn has permission to read/write to it, even though its empty.
# Without this yarn will complain it can't open its config file.
RUN mkdir -p /.cache/yarn /.yarn \
    && touch /.yarnrc \
    && chmod a+rwx /.cache/yarn /.yarn /.yarnrc

RUN apk --no-cache add ruby ruby-json ruby-io-console

ADD with-uid.sh /usr/local/bin

EXPOSE 8007
ENTRYPOINT ["with-uid.sh"]
ENV JUPYTERLAB_DIR /w/jupyterlab
ENV JUPYTER_CONFIG_DIR /w/jupyterlab
ENV JUPYTER_PATH /w/jupyterlab
ENV JUPYTER_RUNTIME_DIR /w/jupyterlab
ENV XDG_DATA_HOME /w/jupyterlab
ENV YARN_CACHE_FOLDER=/w/.yarncache
