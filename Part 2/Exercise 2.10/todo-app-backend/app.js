import "dotenv/config";
import express from "express";
import pg from "pg";
const app = express();
const port = process.env.PORT || 3001;

const client = new pg.Pool();

const createTable = async () => {
  try {
    await client.connect();
    await client.query(`CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      name CHAR(140) NOT NULL
    )`);
    console.log("Table created");
  } catch (err) {
    console.error(err);
  }
};

createTable();

const insertTodo = async (todo) => {
  try {
    await client.connect();
    await client.query(`INSERT INTO todos (name) VALUES ($1)`, [todo]);
    console.log("todo inserted");
  } catch (err) {
    console.error(err);
  }
};

const getEveryTodo = async () => {
  try {
    await client.connect();
    const res = await client.query("SELECT name FROM todos");
    console.log(res.rows);
    return res.rows;
  } catch (error) {
    console.error(error);
  }
};

app.use(express.urlencoded({ extended: false }));

app.get("/api/todos", async (req, res) => {
  const todos = await getEveryTodo();
  res.status(200).json({ todos });
});

app.post("/api/todos", async (req, res) => {
  const { todo } = req.body;
  if (todo.length > 140) {
    return res.status(400).json({ error: "Todo is too long" });
  }

  await insertTodo(todo);
  res.status(200).send("success");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
