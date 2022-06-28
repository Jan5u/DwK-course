import "dotenv/config";
import express from "express";
const app = express();
const port = process.env.PORT || 3000;

const randomString =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

let timestamp = new Date().toISOString();

function logTimeandString() {
  timestamp = new Date().toISOString();
  console.log(timestamp + ": " + randomString);
}

logTimeandString();

setInterval(() => {
  logTimeandString();
}, 5000);

app.get("/", (req, res) => {
  res.send(timestamp + ": " + randomString);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
