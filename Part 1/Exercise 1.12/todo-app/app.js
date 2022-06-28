import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import axios from "axios";
const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();
app.use(express.static("/usr/src/app/files/"));

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
  // check if image exists
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

app.get("/", async (req, res) => {
  await checkImage();
  res.sendFile("index.html", { root: __dirname });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
