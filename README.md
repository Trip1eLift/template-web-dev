# web-dev-template
a template for full stack web development.

## Prerequisites

1. node with npm
The project is built using node v18.10.0; however, a relatively new version of node should work.

2. docker
Hardware assisted virtualization might need to be enabled in BIOS for windows machine. 

## Launch all 3 layers spontaneously

The following commands are to be run in the root directory of the project.

### `docker-compose up`

Runs the app in the terminal.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `docker-compose up --detach

Runs the app in the background.\
Open docker desktop app to monitor the processes.

### `docker system prune -a && docker volume prune`

Cleans up docker completely including containers, images, and volumns.\
A complete refresh is required to reflect the latest code change in docker-compose. Launching services seperately is usually prefered for development.

## Launch 3 layers seperately

Launching layers individually is recommanded during development. Each layer may occupy a terminal process if detach option is not used.

### Launch database

```
cd database

docker-compose up
```

### Launch backend

```
cd backend

npm install

npm start
```

rest files under `backend/rest-client` can be used with `REST Client` vscode extension to debug backend. Use `health.rest` or run `curl http://localhost:8080/health` to check if the backend is healthy.

### Launch frontend

```
cd frontend

npm install

npm start
```