import { useState } from "react";

const CATEGORIES = ["Food", "Transport", "Housing", "Utilities", "Health", "Other"];

export default function ExpenseForm({ onCreate }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: CATEGORIES[0],
    date: new Date().toISOString().slice(0, 10),
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const amount = parseFloat(form.amount);
    if (!form.title.trim() || isNaN(amount) || amount <= 0) {
      setError("Enter a title and a positive amount.");
      return;
    }

    setSubmitting(true);
    try {
      await onCreate({ ...form, amount });
      setForm({ ...form, title: "", amount: "", notes: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} placeholder="Groceries" />
        </label>
        <label>
          Amount
          <input name="amount" type="number" step="0.01" value={form.amount} onChange={handleChange} placeholder="0.00" />
        </label>
      </div>
      <div className="form-row">
        <label>
          Category
          <select name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label>
          Date
          <input name="date" type="date" value={form.date} onChange={handleChange} />
        </label>
      </div>
      <label>
        Notes
        <input name="notes" value={form.notes} onChange={handleChange} placeholder="Optional" />
      </label>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? "Adding…" : "Add expense"}
      </button>
    </form>
  );
}
