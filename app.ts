import { opine } from "https://deno.land/x/opine@0.24.0/mod.ts";

const app = opine();
const port = 3000;

export {start_app};

function start_app(port: number) {
  app.use((req, res) => {
    res.send("Hello World");
  });
  
  console.log(`Running on http://localhost:${port}`)
  
  return app.listen(port);
}


// check if was executed
if (import.meta.main) {
  start_app(port);
}
