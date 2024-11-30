import express from "express";

export default function api() { 
  const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get('/judgments', async (req, res) => {
  const judgments = "helloWorld";
  res.json(judgments);
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}
