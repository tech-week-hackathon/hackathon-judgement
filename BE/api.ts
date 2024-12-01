import express from "express";
import cors from "cors";
import {connect , getDb} from "./db.js";

export default function api() { 
  const app = express();
  const db = getDb("webData");
  // Enable CORS for all routes
  app.use(cors());

  app.get("/", (req, res) => {
    res.send(JSON.stringify({ "helloWorld": "helloWorld" }));
  });

  app.get('/judgements', async (req, res) => {
    const judgements = await db.collection("judgements").find({}).toArray();
    res.json(JSON.stringify(judgements));
  }); 


  app.get('/judgements/:id', async (req, res) => {
    try {
      const upCount = await db.collection("judgements").countDocuments({ judgement: "up" , member: req.params.id});
      const downCount = await db.collection("judgements").countDocuments({ judgement: "down" , member: req.params.id});
      const judgements = await db.collection("judgements").find({member: req.params.id}).toArray();
      res.json({ up: upCount, down: downCount , total: upCount - downCount, judgements: judgements });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while counting judgments." });
    }
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}
