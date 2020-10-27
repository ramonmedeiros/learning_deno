default: run

run:
	docker-compose up -d
	deno run --allow-net --allow-read --allow-env --allow-write --allow-plugin --unstable app.ts

test:
	deno test --allow-net --allow-read tests/integration/*

