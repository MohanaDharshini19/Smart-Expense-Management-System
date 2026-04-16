require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const authRoutes = require("./routes/auth");
const app = express();
const transactionRoutes = require("./routes/transactions");

// Use routes
app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/transactions", transactionRoutes);


app.get("/", (req, res) => {
    res.send("Expense Tracker Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});