import express from "express"; 
import usersRoutes from "./Routes/usersRoutes.mjs";
import commentsRoutes from "./Routes/commentsRoutes.mjs";
import postsRoutes from "./Routes/postsRoutes.mjs";
import { errHandler } from "./middleware/errHandler.mjs";
import users from "./dataSource/users.mjs";
import userInfo  from "./dataSource/usersInfo.mjs"; 



const app = express(); // calling Express to use in the future
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));


// Routes
app.use("/api/users", usersRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/posts", postsRoutes);

app.set("view engine", "ejs");
app.set("views", "./views"); 

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the User-Friendly Express Server API!");
});

app.get("/views/users", (req, res) => {
  res.render("users", { users });
});

// Form handler 
app.post("/views/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send("Name and Email are required.");
  }

  users.push({ name, email });
  res.redirect("/views/users");
});


app.use((req, res) => {
  res.status(404).json({ msg: "Resource Not Found" });
});

// Error Handling
app.use(errHandler);

// Created an Error Handling Middleware to handle this 
/* app.use(function (err, req, res, next) {
  res.status(500).json({ msg: `❌ Error - ${err.message}` });
}); */


app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});




