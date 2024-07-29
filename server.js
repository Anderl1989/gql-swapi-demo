import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/api', (req, res) => {
  res.send('Willkommen ind er API');
});

app.use(express.static('dist'));

app.use(function (req, res) {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});