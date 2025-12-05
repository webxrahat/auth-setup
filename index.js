import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/connetDB.js";




dotenv.config();
connectDB();

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: Number(process.env.MAXAGE),  secure: false },
  })
);



const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
