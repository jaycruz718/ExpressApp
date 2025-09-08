import express from "express";
import { posts } from "../dataSource/posts.mjs";

const router = express.Router();

router
.get("/", (req, res) => {
    res.json(post);
});

router
.get("/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if (!post) {
        const err = new Error("Post not found");
        err.status = 404;
        return next(err);
    }

    res.json(post);
})

.post("/", (req, res, next) => {
    try {
        const { userId, title, body } = req.body;

        if (!userId || !title || !body) {
            const err = new Error("Missing required fields");
            err.status = 400;
            throw err;
        }

        const newPost = {
            id: posts.length + 1,
            userId,
            title,
            body
        };

        posts.push(newPost);
        res.status(201).json(newPost);
    } catch (err) {
        next(err);
    }
})

.delete("/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(posts => posts.id === id);

    if (index === -1) {
        const err = new Error("Post not found");
        err.status = 404;
        return next(err);
    }

    const deletedPost = posts.splice(index, 1);
    res.json(deletedPost[0]);
});

export default router;
