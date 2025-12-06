import express from "express";
const app = express();
import dotenv from "dotenv";
import session from "express-session";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/connetDB.js";
import User from "./models/user.model.js";

dotenv.config();
connectDB();

app.use(express.json());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "defaultsecret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: Number(process.env.MAXAGE),  secure: false },
//   })
// );



const PORT = process.env.PORT || 3000;

app.get("/api", (req, res) => {
  res.send("Hello, World!");
});
app.post("/api/login", (req, res) => {
  res.send("Hello, World!");
});
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  res.send({ username, hashedPassword });
  // const newUser = new User({ username, password: hashedPassword });
  // newUser.save()
  //   .then(() => res.status(201).send("User registered"))
  //   .catch((err) => res.status(500).send("Error registering user"));
});
app.get("/profile", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
