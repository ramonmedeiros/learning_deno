// Defining schema interface
interface UserSchema {
  _id: { $oid: string };
  username: string;
  password: string;
}
