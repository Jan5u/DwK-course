import "dotenv/config";
import express from "express";
import axios from "axios";
const app = express();
const port = process.env.PORT || 3000;

const randomString =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

const getPingPongs = async () => {
  try {
    const { data } = await axios.get("http://ping-pong-svc/pingpong");
    return data;
  } catch (error) {
    console.log(error);
  }
};

app.get("/", async (req, res) => {
  const pongs = await getPingPongs();
  res.send(new Date().toISOString() + " " + randomString + " pings: " + pongs);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
