import express from "express";
import { comments } from "../dataSource/comments.mjs";
const router = express.Router();

// GET /api/comments
router.get("/", (req, res) => {
  res.json(comments);
});

router
.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const comment = comments.find(c => c.id === id);

  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }

  res.json(comment);
})

.post("/", (req, res) => {
  const { userId, title, content } = req.body;

  if (!userId || !title || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newComment = {
    id: comments.length + 1,
    userId,
    title,
    content
  };

  comments.push(newComment);
  res.status(201).json(newComment);
})

.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = comments.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Comment not found" });
  }

  const deletedComment = comments.splice(index, 1);
  res.json(deletedComment[0]);
});

export default router;


