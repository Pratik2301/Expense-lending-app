import { useEffect, useState } from "react";
import * as api from "../services/api.js";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [lendings, setLendings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch both resources in parallel — no reason to wait for one
    // before starting the other.
    Promise.all([api.getExpenses(), api.getLendings()])
      .then(([exp, lend]) => {
        setExpenses(exp);
        setLendings(lend);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalLent = lendings
    .filter((l) => l.type === "lent" && l.status === "pending")
    .reduce((sum, l) => sum + l.amount, 0);
  const totalBorrowed = lendings
    .filter((l) => l.type === "borrowed" && l.status === "pending")
    .reduce((sum, l) => sum + l.amount, 0);
  const netPosition = totalLent - totalBorrowed;

  if (loading) return <div className="page"><p>Loading…</p></div>;

  return (
    <div className="page">
      <h1>Overview</h1>
      <p className="page-sub">Your finances at a glance.</p>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-label">Total spent</span>
          <span className="stat-value mono">₹{totalExpenses.toFixed(2)}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Owed to you</span>
          <span className="stat-value mono stat-green">₹{totalLent.toFixed(2)}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">You owe</span>
          <span className="stat-value mono stat-red">₹{totalBorrowed.toFixed(2)}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Net position</span>
          <span className={`stat-value mono ${netPosition >= 0 ? "stat-green" : "stat-red"}`}>
            {netPosition >= 0 ? "+" : "-"}₹{Math.abs(netPosition).toFixed(2)}
          </span>
        </div>
      </div>

      <section className="card">
        <h2>Recent expenses</h2>
        {expenses.slice(0, 5).map((e) => (
          <div className="list-row" key={e.id}>
            <span>{e.title}</span>
            <span className="mono">₹{e.amount.toFixed(2)}</span>
          </div>
        ))}
        {expenses.length === 0 && <p className="empty-state">Nothing logged yet.</p>}
      </section>
    </div>
  );
}
