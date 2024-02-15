FROM paketobuildpacks/dotnet-core AS dotnet
FROM gcc AS gcc
FROM golang AS golang

# Install NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Install Node.js version 18.18.2
RUN /bin/bash -c "source ~/.nvm/nvm.sh \
    && nvm install 18.18.2 \
    && nvm alias default 18.18.2 \
    && nvm use default"

WORKDIR /app
COPY . .
