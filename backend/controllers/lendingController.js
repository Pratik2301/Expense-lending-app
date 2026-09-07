// controllers/lendingController.js
import db from "../db.js";

export function getAllLendings(req, res) {
  const rows = db.prepare("SELECT * FROM lendings ORDER BY date DESC").all();
  res.json(rows);
}

export function createLending(req, res) {
  const { person_name, amount, type, date, due_date, notes } = req.body;

  if (!person_name || amount == null || !type || !date) {
    return res.status(400).json({ error: "person_name, amount, type, and date are required" });
  }
  if (!["lent", "borrowed"].includes(type)) {
    return res.status(400).json({ error: "type must be 'lent' or 'borrowed'" });
  }
  if (typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "amount must be a positive number" });
  }

  const stmt = db.prepare(
    `INSERT INTO lendings (person_name, amount, type, date, due_date, notes)
     VALUES (?, ?, ?, ?, ?, ?)`
  );
  const result = stmt.run(person_name, amount, type, date, due_date || null, notes || "");
  const created = db.prepare("SELECT * FROM lendings WHERE id = ?").get(result.lastInsertRowid);

  res.status(201).json(created);
}

export function updateLendingStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "settled"].includes(status)) {
    return res.status(400).json({ error: "status must be 'pending' or 'settled'" });
  }

  const existing = db.prepare("SELECT * FROM lendings WHERE id = ?").get(id);
  if (!existing) return res.status(404).json({ error: "Record not found" });

  db.prepare("UPDATE lendings SET status = ? WHERE id = ?").run(status, id);
  const updated = db.prepare("SELECT * FROM lendings WHERE id = ?").get(id);
  res.json(updated);
}

export function deleteLending(req, res) {
  const { id } = req.params;
  const result = db.prepare("DELETE FROM lendings WHERE id = ?").run(id);
  if (result.changes === 0) return res.status(404).json({ error: "Record not found" });
  res.status(204).send();
}
