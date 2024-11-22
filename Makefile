.PHONY: build up stop remove

build:
	docker compose build

build-force:
	docker compose build --no-cache	

up:
	docker compose up -d

stop:
	docker stop frontend-in-space

remove:
	docker remove frontend-in-space
