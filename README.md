# Serverless Typescript Starter
This project is used to be the starting point for Serverless Node development with Typescript.  

## Overview

This project runs inside of Docker container.
It includes the ability to run Lambda functions locally with `serverless-offline` plugin and build Typescript with `serverless-webpack`. It also provides debug and test environment support with automatic recompilation and reattaching debug process in case of source files changes using `VS Code` debug tools.

## Installation
* Install [Docker for Windows](https://store.docker.com/editions/community/docker-ce-desktop-windows) or [Docker for Mac](https://store.docker.com/editions/community/docker-ce-desktop-mac)
* Enable drive sharing in Docker (Settings -> Shared Drives)
* cd to the project root `/serverless-typescript-starter` and execute `docker-compose up` to run the service in Docker.
* Wait for the compilation to be completed and POST to `http://localhost:3000/publish/{event}` in Postman

## Debugging
This project is using `VS Code` debugging functionalitty.
* Run the service with `docker-compose up` command. By default it runs in the debug mode with `npm run debug:test`. This will expose the `5858` port from the container so we could attach to it and run tests in watch mode.
* Open the project in `VS Code`. In project root inside of `.vscode` folder there are `launch.json` configuration for launching and attaching to the Docker.
* Open `Debug` section in `VS Code`, select `Attach to Docker` configuration and hit `Start Debugging`.

Now you could set breakpoints in `.ts` files and modify them. They will be automatically recompiled and reattached with debug.