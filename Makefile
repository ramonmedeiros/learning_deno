default: run

DENO_ARGS=--allow-net --allow-read --allow-env --allow-write --allow-plugin --unstable

run:
	docker-compose up -d
	deno run $(DENO_ARGS) app.ts

test:
	docker-compose up --force-recreate --renew-anon-volumes -d
	deno test $(DENO_ARGS) tests/integration/*

lint:
	deno lint --unstable
