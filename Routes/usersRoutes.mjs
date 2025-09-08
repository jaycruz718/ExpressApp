import express from "express";
import { users } from "../dataSource/users.mjs";
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.json(users);
  })
  .post((req, res) => {
    const { name, username, email } = req.body;

    // Check if all required fields are present
    if (name && username && email) {
      // Check if username already exists
      if (users.find((u) => u.username === username)) {
        res.status(400).json({ err: "Username taken" });
        return;
      }

      // Create new user
      const newUser = {
        id: users.length + 1,
        name,
        username,
        email,
      };

      users.push(newUser);

      res.status(201).json(newUser);
    } else {
      res.status(400).json({ err: "Missing required fields: name, username, or email" });
    }
  });

  export default router;
