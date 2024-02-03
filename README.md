# OpenAI POC

Simple React app using vite to allow user to chat with open AI API.

## Getting started with local development 

First, clone the repo and go into the `openai-poc/` directory:

```bash
git clone git@github.com:maxfelker/openai-poc.git
cd openai-poc/
```

### Creating environment variable file

In the root of the project, you'll need to create the `.env` file which contains base url for the API. Here is what the file should look like:

```
VITE_API_BASE_URL=http://localhost:8000
```

### Building and running the dev service 

Now you are ready to run the `dev` Docker service and start the API:

```bash
docker compose up --build dev
```

This will run the app locally at [http://localhost:5173](http://localhost:5173). The dev service has hot reloading support using [hmr](https://vitejs.dev/guide/api-hmr).

### Building and running the release service

If you want to build a production version, build and run the `release` Docker service:

```bash
docker compose up --build release
```

This will run the API locally at [http://localhost](http://localhost) (port 80). The `release` service is a transpiled version of the React src and a light weight nginx distro intended for production environments.


## Building for ACR 

We can use the AZ CLI tool to do this. First, login:

```bash
az login
```

Next, do the build and push change manually:

```bash
az acr build --image openai-poc/release:latest --registry maxfelkershared .
```