import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import stringSimilarity from 'string-similarity';


const router = express.Router();

// __dirname fix for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load health data
const dataPath = path.join(__dirname, '../data/healthData.json');
let healthData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

router.post('/', (req, res) => {
  const userQuestion = req.body.question.toLowerCase();
  if (!userQuestion) return res.status(400).json({ error: 'Question is required' });

  const questions = healthData.map(item => item.question);
  const { bestMatchIndex, ratings } = stringSimilarity.findBestMatch(userQuestion, questions);

  // Only return if similarity > 0.4
  if (ratings[bestMatchIndex].rating > 0.4) {
    res.json({ answer: healthData[bestMatchIndex].answer });
  } else {
    res.json({ answer: "Sorry, I don't know the answer to that health question." });
  }
});

export default router;
