import "dotenv/config";
import express from "express";
const app = express();
const port = process.env.PORT || 3000;

let pongCounter = 0;

app.get("/pingpong", (req, res) => {
  pongCounter++;
  res.send("pong " + pongCounter);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
