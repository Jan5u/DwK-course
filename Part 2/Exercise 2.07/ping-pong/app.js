import "dotenv/config";
import express from "express";
import pg from "pg";
const app = express();
const port = process.env.PORT || 3001;

const client = new pg.Pool();

const createTable = async () => {
  try {
    await client.connect();
    await client.query(`CREATE TABLE IF NOT EXISTS pingpongs (
      id SERIAL PRIMARY KEY,
      pongs INT NOT NULL
    )`);
    console.log("Table created");
  } catch (err) {
    console.error(err);
  }
};

const insertPing = async (pong) => {
  try {
    await client.connect();
    await client.query(`INSERT INTO pingpongs (pongs) VALUES ($1)`, [pong]);
    console.log("Ping inserted");
  } catch (err) {
    console.error(err);
  }
};

const updatePong = async (pong) => {
  try {
    await client.connect();
    await client.query(`UPDATE pingpongs SET pongs = $1 WHERE id = 1`, [pong]);
    console.log("Pong updated");
  } catch (err) {
    console.error(err);
  }
};

const ping = async () => {
  try {
    await client.connect();
    const res = await client.query("SELECT pongs FROM pingpongs");
    console.log(res.rows[0]);
    return res.rows[0].pongs;
  } catch (error) {
    console.error(error);
  }
};

let pongCounter = (await ping()) || 0;

app.get("/pingpong", async (req, res) => {
  pongCounter++;
  await updatePong(pongCounter);
  const pongsfromDB = await ping();
  res.json(pongsfromDB);
});

app.get("/pingpong/createtable", async (req, res) => {
  await createTable();
  res.json("Table created");
});

app.get("/pingpong/createrow", async (req, res) => {
  await insertPing(pongCounter);
  res.json("row created");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
