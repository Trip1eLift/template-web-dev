start:
	docker-compose up --build
	
start-bg:
	docker-compose up --build --detach

down:
	docker-compose down -v

cleanse:
	docker system prune -a && docker volume prune

start-database: 
	cd database; docker-compose up --detach

stop-database:
	cd database; docker-compose down

start-backend:
	cd backend; npm install
	cd backend; npm start

start-frontend:
	cd frontend; npm install
	cd frontend; npm start

remove-files:
	cd backend; rm -rf node_modules
	cd frontend; rm -rf node_modules
	cd frontend; rm -rf build

deep-cleanse: cleanse remove-files