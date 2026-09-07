import { useEffect, useState } from "react";
import LendingForm from "../components/LendingForm.jsx";
import LendingList from "../components/LendingList.jsx";
import * as api from "../services/api.js";

export default function Lending() {
  const [lendings, setLendings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getLendings()
      .then(setLendings)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(data) {
    const created = await api.createLending(data);
    setLendings((prev) => [created, ...prev]);
  }

  async function handleToggleStatus(id, status) {
    const updated = await api.updateLendingStatus(id, status);
    setLendings((prev) => prev.map((l) => (l.id === id ? updated : l)));
  }

  async function handleDelete(id) {
    await api.deleteLending(id);
    setLendings((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <div className="page">
      <h1>Lending</h1>
      <p className="page-sub">Track money you've lent out or borrowed from others.</p>

      <section className="card">
        <LendingForm onCreate={handleCreate} />
      </section>

      <section className="card">
        {loading && <p>Loading…</p>}
        {error && <p className="form-error">{error}</p>}
        {!loading && !error && (
          <LendingList lendings={lendings} onToggleStatus={handleToggleStatus} onDelete={handleDelete} />
        )}
      </section>
    </div>
  );
}
