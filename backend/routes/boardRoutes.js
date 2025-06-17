const express = require("express");
const router = express.Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const { category } = req.query;

  const filters = {};

  if (category) {
    filters.category = category;
  }

  try {
    const boards = await prisma.board.findMany({
      where: filters,
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(boards);
  } catch (error) {
    console.error("Error fetching boards:", error);
    res.status(500).json({ error: "Internal server error" });
  }
    // const boards = await prisma.board.findMany()
    // res.json(boards);

});

router.post("/", async (req, res) => {
  // Double validation for required fields
  if (!req.body.title || !req.body.category) {
    return res.status(400).send("Title and category are required");
  }
  const { title, category, author } = req.body;
  const randomId = Math.floor(Math.random() * 500) + 1;
  const imageUrl = `https://picsum.photos/id/${randomId}/200/200`;
  const newBoard = await prisma.board.create({
    data: {
      title,
      category,
      author,
      imageUrl,
    },
  });

  res.status(201).json(newBoard);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const board = await prisma.board.findUnique({
    where: { id: parseInt(id) },
  });
  try {
    if (board) {
      res.json(board);
    } else {
      res.status(404).send("Board not found");
    }
  } catch (error) {
    console.error("Error fetching board:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedBoard = await prisma.board.delete({
    where: { id: parseInt(id) },
  });

  res.json(deletedBoard);
});

module.exports = router;
