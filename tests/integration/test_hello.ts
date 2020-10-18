import {assertEquals} from "https://deno.land/std@0.74.0/testing/asserts.ts";
import {start_app} from "../../app.ts";


Deno.test("Hello world test", async() => {
  // start app
  const app = start_app(3000);

  // fetch index
  const response = await fetch("http://localhost:3000/", {
    method: "GET",
  }).then(response => response);

  // assert return
  assertEquals(await response.text(), "Hello World");

  // some tcpStream is open
  app.close();
});

