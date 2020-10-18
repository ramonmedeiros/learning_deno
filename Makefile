default: run

run:
	deno run --allow-net --allow-read app.ts

test:
	deno test --allow-net --allow-read tests/integration/*

