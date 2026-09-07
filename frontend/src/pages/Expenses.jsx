import { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import * as api from "../services/api.js";

// A "page" component's job: fetch data, hold state, pass data + handlers
// down to smaller components. The form/list components below don't know
// anything about the API — they just receive props and call callbacks.
export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getExpenses()
      .then(setExpenses)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(data) {
    const created = await api.createExpense(data);
    setExpenses((prev) => [created, ...prev]);
  }

  async function handleDelete(id) {
    await api.deleteExpense(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="page">
      <h1>Expenses</h1>
      <p className="page-sub">Log everyday spending and keep it categorized.</p>

      <section className="card">
        <ExpenseForm onCreate={handleCreate} />
      </section>

      <section className="card">
        {loading && <p>Loading…</p>}
        {error && <p className="form-error">{error}</p>}
        {!loading && !error && <ExpenseList expenses={expenses} onDelete={handleDelete} />}
      </section>
    </div>
  );
}
