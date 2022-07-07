import axios from "axios";

async function getRandomWikiPage() {
  const response = await axios.get(
    "https://en.wikipedia.org/wiki/Special:Random"
  );
  return response.request.path;
}

console.log(
  "read this:",
  "https://en.wikipedia.org" + (await getRandomWikiPage())
);
