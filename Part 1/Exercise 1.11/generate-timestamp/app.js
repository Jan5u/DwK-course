import "dotenv/config";
import express from "express";
import fs from "fs";
const app = express();
const port = process.env.PORT || 3000;
const randomString =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);
let timestamp = new Date().toISOString();

function saveTimestamp() {
  timestamp = new Date().toISOString();
  console.log(timestamp + ": " + randomString);
  const file = "/usr/src/app/files/timestamp.txt";
  fs.writeFile(file, timestamp, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}

saveTimestamp();

setInterval(() => {
  saveTimestamp();
}, 5000);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
