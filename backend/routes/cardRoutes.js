const express = require("express");
const router = express.Router({ mergeParams: true });
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// GET /api/boards/:boardId/cards
router.get("/", async (req, res) => {
  const { boardId } = req.params;
  try {
    const cards = await prisma.card.findMany({
      where: {
        board_id: parseInt(boardId, 10),
      },
      orderBy: [{ pinned: "desc" }, { pinnedAt: "desc" }],
    });
    res.json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/boards/:boardId/cards
router.post("/", async (req, res) => {
  const { boardId } = req.params;
  try {
    if (!req.body.title || !req.body.content || !req.body.gifUrl) {
      return res.status(400).send("Title, content, and GIF URL are required");
    }
    const { title, content, author, gifUrl } = req.body;
    const board_id = parseInt(boardId, 10);
    const newCard = await prisma.card.create({
      data: {
        board_id,
        title,
        content,
        author,
        gifUrl,
        // upvotes: 0,
      },
    });
    res.status(201).json(newCard);
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/boards/:boardId/cards/:id
router.get("/:id", async (req, res) => {
  const { id, boardId } = req.params;
  try {
    const card = await prisma.card.findFirst({
      where: {
        id: parseInt(id, 10),
        board_id: parseInt(boardId, 10),
      },
    });
    if (card) {
      res.json(card);
    } else {
      res.status(404).send("Card not found");
    }
  } catch (error) {
    console.error("Error fetching card:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/boards/:boardId/cards/:id
router.delete("/:id", async (req, res) => {
  const { id, boardId } = req.params;
  try {
    const deletedCard = await prisma.card.delete({
      where: {
        id: parseInt(id),
        board_id: parseInt(boardId),
      },
    });
    if (deletedCard) {
      res.status(204).send();
    } else {
      res.status(404).send("Card not found");
    }
  } catch (error) {
    console.error("Error deleting card:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/boards/:boardId/cards/:id/upvote
router.post("/:id/upvote", async (req, res) => {
  const { id, boardId } = req.params;
  try {
    const updatedCard = await prisma.card.update({
      where: {
        id: parseInt(id),
        board_id: parseInt(boardId),
      },
      data: {
        upvotes: {
          increment: 1,
        },
      },
    });
    res.json(updatedCard);
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/boards/:boardId/cards/:id
router.put("/:id", async (req, res) => {
  const { id, boardId } = req.params;
  const data = req.body;
  try {
    const updatedCard = await prisma.card.update({
      where: { id: parseInt(id, 10) },
      data,
    });
    res.json(updatedCard);
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
