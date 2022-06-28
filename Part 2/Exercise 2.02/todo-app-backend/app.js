import "dotenv/config";
import express from "express";
const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));

let todos = [];

app.get("/api/todos", async (req, res) => {
  res.status(200).json({ todos });
});

app.post("/api/todos", async (req, res) => {
  const { todo } = req.body;
  todos.push(todo);
  res.status(200).send("success");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
