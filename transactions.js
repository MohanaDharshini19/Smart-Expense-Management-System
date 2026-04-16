// routes/transactions.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middleware/authMiddleware");

// Add transaction
router.post("/", verifyToken, (req, res) => {
  const { type, category_id, amount, description, date } = req.body;
  const user_id = req.user.id;
  const query = "INSERT INTO transactions (user_id,type,category_id,amount,description,date) VALUES (?,?,?,?,?,?)";
  db.query(query, [user_id, type, category_id, amount, description, date], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Transaction added", id: result.insertId });
  });
});

// Get transactions for user
router.get("/", verifyToken, (req, res) => {
  const user_id = req.user.id;
  db.query("SELECT * FROM transactions WHERE user_id=?", [user_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Update transaction
router.put("/:id", verifyToken, (req, res) => {
  const { type, category_id, amount, description, date } = req.body;
  const user_id = req.user.id;
  const { id } = req.params;
  const query = "UPDATE transactions SET type=?, category_id=?, amount=?, description=?, date=? WHERE id=? AND user_id=?";
  db.query(query, [type, category_id, amount, description, date, id, user_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Transaction updated" });
  });
});

// Delete transaction
router.delete("/:id", verifyToken, (req, res) => {
  const user_id = req.user.id;
  const { id } = req.params;
  db.query("DELETE FROM transactions WHERE id=? AND user_id=?", [id, user_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Transaction deleted" });
  });
});

module.exports = router;