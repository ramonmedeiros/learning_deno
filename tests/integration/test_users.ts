import {assertEquals, assert} from "https://deno.land/std@0.74.0/testing/asserts.ts";
import {start_app} from "../../app.ts";
import { Rhum } from "https://deno.land/x/rhum@v1.1.4/mod.ts";
import { Server } from "https://deno.land/x/opine@0.24.0/deps.ts";

var app: Server;

Rhum.testPlan("test_users.ts", () => {
  Rhum.beforeAll(async () => {
    // start app
    app = start_app(3000);
  });

  Rhum.afterAll(() => {
    // some tcpStream is open
    app.close();
  });

  Rhum.testSuite("Testing index", () => {

    Rhum.testCase("GET /users empty",
      async () => {
        const response = await fetch("http://localhost:3000/users", {
           method: "GET",
         }).then(response => response);
         // assert return
         assertEquals(await response.text(), "[]");
    });

    Rhum.testCase("POST /users wrong parameters",
      async () => {
        const response = await fetch("http://localhost:3000/users", {
           method: "POST",
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({"": ""}),
         }).then(response => response);

         // assert return
         assertEquals(await response.status, 400);
         assertEquals(await response.text(), "Missing parameter");
      });

    Rhum.testCase("POST /users success",
      async () => {
        const response = await fetch("http://localhost:3000/users", {
           method: "POST",
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({"user": "test1",
                                 "password": "pass1"}),
         }).then(response => response);

         // assert return
         assertEquals(await response.status, 201);
         await response.text()
         // TODO: should return id
         //assert(await response.text());
      });

    Rhum.testCase("GET /users with one return",
      async () => {
        const response = await fetch("http://localhost:3000/users", {
           method: "GET",
         }).then(response => response);
         // assert return
         assertEquals(JSON.parse(await response.text()).length, 1);
         assertEquals(await response.status, 200);
    });



   });
});

Rhum.run();
