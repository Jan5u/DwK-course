import "dotenv/config";
import express from "express";
import fs from "fs";
const app = express();
const port = process.env.PORT || 3001;

const randomString =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

app.get("/", (req, res) => {
  const fileData = fs.readFileSync("/usr/src/app/files/timestamp.txt", "utf8");
  const pongData = fs.readFileSync("/usr/src/app/files/pings.txt", "utf8");
  res.send(fileData + " " + randomString + " pings: " + pongData);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
