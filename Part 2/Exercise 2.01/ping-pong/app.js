import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT || 3001;

let pongCounter = 0;

app.get("/pingpong", (req, res) => {
  pongCounter++;
  res.json(pongCounter);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
