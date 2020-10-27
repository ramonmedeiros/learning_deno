default: run

run:
	docker-compose up -d
	deno run --allow-net --allow-read --allow-env --allow-write --allow-plugin --unstable app.ts

test:
	docker-compose up --force-recreate --renew-anon-volumes -d
	deno test --allow-net --allow-read --allow-env --allow-plugin --unstable tests/integration/*

lint:
	deno lint --unstable
