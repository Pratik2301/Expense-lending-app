// controllers/expenseController.js
// Controllers hold the LOGIC for each route: read input, talk to the
// database, send a response. Routes just point a URL + method at a
// controller function — they stay thin on purpose.

import db from "../db.js";

export function getAllExpenses(req, res) {
  const rows = db.prepare("SELECT * FROM expenses ORDER BY date DESC").all();
  res.json(rows);
}

export function createExpense(req, res) {
  const { title, amount, category, date, notes } = req.body;

  // Basic validation — never trust data coming from the client.
  if (!title || amount == null || !category || !date) {
    return res.status(400).json({ error: "title, amount, category, and date are required" });
  }
  if (typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "amount must be a positive number" });
  }

  const stmt = db.prepare(
    "INSERT INTO expenses (title, amount, category, date, notes) VALUES (?, ?, ?, ?, ?)"
  );
  const result = stmt.run(title, amount, category, date, notes || "");
  const newExpense = db.prepare("SELECT * FROM expenses WHERE id = ?").get(result.lastInsertRowid);

  res.status(201).json(newExpense);
}

export function updateExpense(req, res) {
  const { id } = req.params;
  const existing = db.prepare("SELECT * FROM expenses WHERE id = ?").get(id);
  if (!existing) return res.status(404).json({ error: "Expense not found" });

  const { title, amount, category, date, notes } = req.body;
  db.prepare(
    "UPDATE expenses SET title = ?, amount = ?, category = ?, date = ?, notes = ? WHERE id = ?"
  ).run(
    title ?? existing.title,
    amount ?? existing.amount,
    category ?? existing.category,
    date ?? existing.date,
    notes ?? existing.notes,
    id
  );

  const updated = db.prepare("SELECT * FROM expenses WHERE id = ?").get(id);
  res.json(updated);
}

export function deleteExpense(req, res) {
  const { id } = req.params;
  const result = db.prepare("DELETE FROM expenses WHERE id = ?").run(id);
  if (result.changes === 0) return res.status(404).json({ error: "Expense not found" });
  res.status(204).send();
}
