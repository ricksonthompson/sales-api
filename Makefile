build:
	docker compose up -d --build 

.PHONY: build

deploy:
	git pull
	docker compose up -d --build 

.PHONY: deploy

up:
	docker compose up -d 

.PHONY: up

down: 
	docker compose down

.PHONY: down

logs:
	docker logs sales-api -f

.PHONY: logs
