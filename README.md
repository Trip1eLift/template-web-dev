# web-dev-template
a template for full stack web development.

## Prerequisites

1. node with npm
The project is built using node v18.10.0; however, a relatively new version of node should work.

2. docker
Hardware assisted virtualization might need to be enabled in BIOS for windows machine. 

## Launch all 3 layers spontaneously

The following commands are to be run in the root directory of the project.

### `make start`

Runs the app in the terminal.\
Open docker desktop app to monitor the processes.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `make start-bg`

Runs the app in the background.

### `make down`

Shuts down app's cotainer while removes app's image and volume.\

### `make cleanse`

Cleans up docker completely including all containers, images, and volumns.\
The container processes have to be stopped before running this command.\


## Launch 3 layers seperately

Launching layers individually is recommanded during development. Each layer may occupy a terminal process if detach option is not used.

### `make start-database`

Launches database in background.

### `make stop-database`

Stops the database in background. But it does not remove the volume of database.

### `make start-backend`

Starts the backend in terminal using nodemon which restarts itself on every code change.

Rest files under `backend/rest-client` can be used with `REST Client` vscode extension to debug backend. Use `health.rest` or run `curl http://localhost:8080/health` to check if the backend is healthy.

### `make start-frontend`

Starts the frontend in terminal using react scripts. It restarts itself on every code change.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `make remove-files`

Removes modules and build files from backend and frontend.

### `make deep-cleanse`

Runs both `make cleanse` and `make remove-files`.