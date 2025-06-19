const express = require("express");
const router = express.Router({ mergeParams: true });
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// GET /api/boards/:boardId/cards/:cardId/comments
router.get("/", async (req, res) => {
  const { cardId, boardId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: {
        card_id: parseInt(cardId, 10),
      },
    });
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/boards/:boardId/cards/:cardId/comments
router.post("/", async (req, res) => {
  const { cardId, boardId } = req.params;
  try {
    if (!req.body.content) {
      return res.status(400).send("Comment content is required");
    }
    const { content, author } = req.body;
    const card_id = parseInt(cardId, 10);
    const newComment = await prisma.comment.create({
      data: {
        card_id,
        content,
        author,
      },
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/boards/:boardId/cards/:cardId/comments/:commentId
router.delete("/:commentId", async (req, res) => {
  const { cardId, boardId, commentId } = req.params;
  try {
    const deletedComment = await prisma.comment.delete({
      where: {
        id: parseInt(commentId, 10),
        card_id: parseInt(cardId, 10),
      },
    });
    if (deletedComment) {
      res.status(204).send();
    } else {
      res.status(404).send("Comment not found");
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
