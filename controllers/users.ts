import { Router } from "https://deno.land/x/opine@0.24.0/mod.ts";
import connect from "./../db.ts";
import type { UserSchema } from "./../schemas/users.ts";

const Users = Router();

function setupDB() {
  const conn = connect();
  const users = conn.collection<UserSchema>("users");
  return users;
}

// GET on /users/ should retrieve list of users
Users.get("/", async (req, res) => {
  const users = setupDB();

  try {
    const allUsers = await users.find({ username: { $ne: null } });
    res.send(allUsers);
  } catch (error) {
    console.error(error);
    res.send(500);
  }
});


// POST /users/ add a user
Users.post("/", async (req, res) => {
  const users = setupDB();

  // verify if user and pass are passed
  if ((await req.parsedBody.hasOwnProperty("user") == false) || (await req.parsedBody.hasOwnProperty("password") == false)) {
    res.setStatus(400);
    res.send("Missing parameter");
  }

  // passed params: add to db
  try {
      const insertId = await users.insertOne({
      username: req.parsedBody.user,
      password: req.parsedBody.password,
    });
  } catch (error) {
    console.error(error);
    res.send(500);
  }

  res.send(201);
});

// GET /users/<id> get user by id
Users.get('/:id', async (req, res) => {
  const users = setupDB();
  const user1 = await users.findOne({ _id: req.params.id });
  res.send(user1);
});

export default Users;
