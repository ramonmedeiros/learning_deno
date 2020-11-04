default: run

DENO_ARGS=--allow-net --allow-read --allow-env --allow-write --allow-plugin --unstable

run-opine:
	docker-compose up -d
	deno run $(DENO_ARGS) opine/app.ts

test-opine:
	docker-compose up --force-recreate --renew-anon-volumes -d
	deno test $(DENO_ARGS) --coverage --failfast tests/opine/integration/*

lint:
	deno fmt
