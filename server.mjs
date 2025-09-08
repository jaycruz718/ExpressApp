import express from "express"; 
import usersRoutes from "./Routes/usersRoutes.mjs";
import commentsRoutes from "./Routes/commentsRoutes.mjs";
import postsRoutes from "./Routes/postsRoutes.mjs";
// import errHandler from "./middleware/errHandler.mjs";

const app = express(); // calling Express to use in the future
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


// Routes
app.use("/api/users", usersRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/posts", postsRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the User-Friendly Express Server API!");
});



app.use((req, res) => {
  res.status(404).json({ msg: "Resource Not Found" });
});

// Created an Error Handling Middleware to handle this 
/* app.use(function (err, req, res, next) {
  res.status(500).json({ msg: `❌ Error - ${err.message}` });
}); */


app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});




