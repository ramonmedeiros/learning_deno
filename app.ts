import { opine } from "https://deno.land/x/opine@0.24.0/mod.ts";

const app = opine();
const port = 3000;

app.use((req, res) => {
  res.send("Hello World");
});

console.log(`Running on http://localhost:${port}`)

app.listen(port);
