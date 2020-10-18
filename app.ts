import { opine } from "https://deno.land/x/opine@0.24.0/mod.ts";

const app = opine();

app.use((req, res) => {
  res.send("Hello World");
});

app.listen(3000);
