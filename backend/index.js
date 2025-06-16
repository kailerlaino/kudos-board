const cors = require("cors");
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let boards = [
  { id: 1, title: "Test Board", category: "Test Category", author: "Test" },
  { id: 2, title: "Test Board", category: "Test Category", author: "Test" },
  { id: 3, title: "Test Board", category: "Test Category", author: "Test" },
];

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Adopt-a-Pet</title>
      </head>
      <body>
        <h1>Hello, World!</h1>
        <p>Welcome to my kudos board server.</p>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Kudos server running at http://localhost:${PORT}!`);
});

app.get("/boards", (req, res) => {
  res.json(boards);
});

app.get("/boards/:boardId", (req, res) => {
  const boardId = parseInt(req.params.boardId);
  const board = boards.find((board) => board.id === boardId);
  if (board) {
    res.json(board);
  } else {
    res.status(404).send("Board not found");
  }
});

app.post("/boards", (req, res) => {
  const { title, category, author } = req.body;

  const newBoard = {
    id: boards.length + 1,
    title,
    category,
    author
  }

  boards.push(newBoard)
  res.status(201).json(newBoard);
});

app.delete('/boards/:boardId', (req, res) => {
  const { boardId } = req.params
  const initialLength = boards.length
  boards = boards.filter(board => board.id !== parseInt(boardId))

  if (boards.length < initialLength) {
    res.status(204).send()
  } else {
    res.status(404).send('Contact not found')
  }
})
