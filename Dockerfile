FROM paketobuildpacks/dotnet-core AS dotnet
FROM gcc AS gcc
FROM golang AS golang

RUN apt-get update && apt-get install -y nodejs npm
RUN npm install -g typescript

WORKDIR /app
COPY . .