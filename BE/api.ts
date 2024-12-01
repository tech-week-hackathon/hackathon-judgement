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

  app.get('/judgment/:id', async (req, res) => {
    const judgment = "helloWorld from id" + req.params.id;
    res.json(judgment);
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}
