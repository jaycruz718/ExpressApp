import express from "express"; 
import usersRoutes from "./Routes/usersRoutes.mjs";


const app = express(); // calling Express to use in the future

const port = process.env.PORT; // using port from our .env file

const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


// Routes
app.use("/api/users", usersRoutes);






app.use((req, res) => {
  res.status(404).json({ msg: "Resource Not Found" });
});

app.use(function (err, req, res, next) {
  res.status(500).json({ msg: `❌ Error - ${err.message}` });
});


app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});


