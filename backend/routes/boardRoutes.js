const express = require("express");
const router = express.Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// GET /api/boards
router.get("/", async (req, res) => {
  const { category, search } = req.query;

  const filters = {};

  if (category) {
    filters.category = category;
  }

  if (search && search.trim()) {
    filters.title = {
      contains: search.trim(),
      mode: "insensitive", // Case-insensitive search
    };
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
});

router.get("/recent", async (req, res) => {
  try {
    const recentBoards = await prisma.board.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 6
    });
    res.json(recentBoards);
  } catch (error) {
    console.error("Error fetching recent boards:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/boards
router.post("/", async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error creating board:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/boards/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const board = await prisma.board.findUnique({
      where: { id: parseInt(id) },
    });
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

// DELETE /api/boards/:id
// TODO: Can't delete board if it has cards
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBoard = await prisma.board.delete({
      where: { id: parseInt(id) },
    });
    if (deletedBoard) {
      res.status(204).send();
    } else {
      res.status(404).send("Board not found");
    }
  } catch (error) {
    console.error("Error deleting board:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
