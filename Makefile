start:
	docker-compose up --build

start-background:
	docker-compose up --build --detach

down:
	docker-compose down -v

cleanse:
	docker system prune -a && docker volume prune