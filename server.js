import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = '/data/users.json';

app.use(bodyParser.json());

// Ensure data directory exists
fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([]));

app.get('/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  res.json(users);
});

app.post('/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
  res.status(201).json(newUser);
});

app.listen(PORT, () => console.log(`✅ Node.js API running on port ${PORT}`));

