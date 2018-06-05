FROM jupyter/base-notebook

USER root

RUN apt-get update && \
  apt-get upgrade -y && \
  apt-get install -q -y gnupg curl

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
RUN apt-get update && \
  apt-get upgrade -y && \
  apt-get install -q -y \
      openjdk-8-jdk \
      git \
      ruby \
      ruby-json \
      nodejs \
      yarn

RUN conda install -c conda-forge jupyterlab

# We touch yarn's config file here so that we can explicitly make sure
# yarn has permission to read/write to it, even though its empty.
# Without this yarn will complain it can't open its config file.
RUN mkdir -p /.cache/yarn /.yarn \
    && touch /.yarnrc \
    && chmod a+rwx /.cache/yarn /.yarn /.yarnrc

USER $NB_UID