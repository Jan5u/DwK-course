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

const createTable = async () => {
  try {
    const { data } = await axios.get(
      "http://ping-pong-svc/pingpong/createtable"
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createRow = async () => {
  try {
    const { data } = await axios.get("http://ping-pong-svc/pingpong/createrow");
    return data;
  } catch (error) {
    console.log(error);
  }
};

app.get("/", async (req, res) => {
  const pongs = await getPingPongs();
  res.send(
    new Date().toISOString() +
      " " +
      randomString +
      " pings: " +
      pongs +
      "env: " +
      process.env.MESSAGE
  );
});
app.get("/createtable", async (req, res) => {
  await createTable();
  res.json({ message: "table created" });
});

app.get("/createrow", async (req, res) => {
  await createRow();
  res.json({ message: "row created" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
