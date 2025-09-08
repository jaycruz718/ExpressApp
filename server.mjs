import express from "express"; 
import usersRoutes from "./Routes/usersRoutes.mjs";
import commentsRoutes from "./Routes/commentsRoutes.mjs";

const app = express(); // calling Express to use in the future
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


// Routes
app.use("/api/users", usersRoutes);
app.use("/api/comments", commentsRoutes);

/* router.get("/", (req, res) => {
  res.json(comments);
}); */




app.use((req, res) => {
  res.status(404).json({ msg: "Resource Not Found" });
});

app.use(function (err, req, res, next) {
  res.status(500).json({ msg: `❌ Error - ${err.message}` });
});


app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});




