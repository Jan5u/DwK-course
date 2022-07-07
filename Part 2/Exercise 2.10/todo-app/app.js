import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();
app.use(express.static("/usr/src/app/files/"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const downloadFile = async () => {
  try {
    const response = await axios.get("https://picsum.photos/1200", {
      responseType: "stream",
    });
    response.data.pipe(fs.createWriteStream("/usr/src/app/files/image.jpg"));
  } catch (error) {
    console.log(error);
  }
};

const checkImage = async () => {
  const imageExists = fs.existsSync("/usr/src/app/files/image.jpg");
  if (!imageExists) {
    return await downloadFile();
  }
  const filePath = "/usr/src/app/files/image.jpg";
  const fileStats = fs.statSync(filePath);
  const fileDate = fileStats.mtime;
  const now = new Date();
  const diff = now.getTime() - fileDate.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days > 1) {
    await downloadFile();
  }
};

const getTodos = async () => {
  const { data } = await axios.get("http://todo-app-backend-svc/api/todos");
  return data;
};

app.get("/", async (req, res) => {
  await checkImage();
  const todos = await getTodos();
  res.render("index", todos);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
