const cors = require("cors");
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
// const { PrismaClient } = require("./generated/prisma");
// const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const boardRoutes = require("./routes/boardRoutes");
app.use("/api/boards", boardRoutes);

const cardRoutes = require("./routes/cardRoutes");
app.use("/api/boards/:boardId/cards", cardRoutes);

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
