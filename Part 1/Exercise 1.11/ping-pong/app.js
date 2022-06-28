import "dotenv/config";
import express from "express";
import fs from "fs";
const app = express();
const port = process.env.PORT || 3002;

let pongCounter = 0;

function saveCounter() {
  const file = "/usr/src/app/files/pings.txt";
  fs.writeFile(file, pongCounter.toString(), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}

app.get("/pingpong", (req, res) => {
  pongCounter++;
  res.send("pong " + pongCounter);
  saveCounter();
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
