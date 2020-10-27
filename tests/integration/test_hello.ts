import {assertEquals} from "https://deno.land/std@0.74.0/testing/asserts.ts";
import {start_app} from "../../app.ts";
import { Rhum } from "https://deno.land/x/rhum@v1.1.4/mod.ts";
import { Server } from "https://deno.land/x/opine@0.24.0/deps.ts";

var app: Server;

Rhum.testPlan("test_hello", () => {
  Rhum.beforeAll(async () => {
    // start app
    app = start_app(3000);
  });

  Rhum.afterAll(() => {
    // some tcpStream is open
    app.close();
  });

  Rhum.testSuite("Testing index", () => {

    Rhum.testCase("Hello World on /",
      async () => {
        const response = await fetch("http://localhost:3000/", {
           method: "GET",
         }).then(response => response);
         // assert return
         assertEquals(await response.text(), "Hello World");
      },
    );

 });

});

Rhum.run();
