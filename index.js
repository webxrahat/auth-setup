import express from "express";
const app = express();
import dotenv from "dotenv";
import session from "express-session";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/connetDB.js";
import User from "./models/user.model.js";
import { authHandler } from "./middlewares/authHandler.js";

dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
  })
);

const PORT = process.env.PORT || 3000;

app.get("/api", authHandler, (req, res) => {
  if (req.session.user) {
    return res.send(`Hello, ${req.session.user}!`);
  } else {
    return res.send("Hello, Guest!");
  }
});

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body || {};
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser
    .save()
    .then(() => res.status(201).send("User registered"))
    .catch((err) => res.status(500).send("Error registering user"));
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body || {};
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send("Invalid credentials");
  }
  req.session.user = username;
  res.send("Login successful");
});

app.get("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.send("Logout successful");
  });
});

app.get("/profile", authHandler, (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
