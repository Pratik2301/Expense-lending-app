import { useState } from "react";

export default function LendingForm({ onCreate }) {
  const [form, setForm] = useState({
    person_name: "",
    amount: "",
    type: "lent",
    date: new Date().toISOString().slice(0, 10),
    due_date: "",
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
    if (!form.person_name.trim() || isNaN(amount) || amount <= 0) {
      setError("Enter a name and a positive amount.");
      return;
    }

    setSubmitting(true);
    try {
      await onCreate({ ...form, amount, due_date: form.due_date || null });
      setForm({ ...form, person_name: "", amount: "", due_date: "", notes: "" });
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
          Person
          <input name="person_name" value={form.person_name} onChange={handleChange} placeholder="Name" />
        </label>
        <label>
          Amount
          <input name="amount" type="number" step="0.01" value={form.amount} onChange={handleChange} placeholder="0.00" />
        </label>
      </div>
      <div className="form-row">
        <label>
          Type
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="lent">I lent money</option>
            <option value="borrowed">I borrowed money</option>
          </select>
        </label>
        <label>
          Date
          <input name="date" type="date" value={form.date} onChange={handleChange} />
        </label>
      </div>
      <div className="form-row">
        <label>
          Due date
          <input name="due_date" type="date" value={form.due_date} onChange={handleChange} />
        </label>
        <label>
          Notes
          <input name="notes" value={form.notes} onChange={handleChange} placeholder="Optional" />
        </label>
      </div>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? "Saving…" : "Add record"}
      </button>
    </form>
  );
}
