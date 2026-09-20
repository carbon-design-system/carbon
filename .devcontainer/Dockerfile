FROM mcr.microsoft.com/devcontainers/javascript-node:24-bookworm

RUN su node -s /bin/bash -c \
        'source /usr/local/share/nvm/nvm.sh && nvm install 24.20.0 && nvm alias default 24.20.0'

RUN apt-get update \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y --no-install-recommends \
        ripgrep \
        shellcheck \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
