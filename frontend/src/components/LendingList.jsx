export default function LendingList({ lendings, onToggleStatus, onDelete }) {
  if (lendings.length === 0) {
    return <p className="empty-state">No lending records yet. Add one above.</p>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Person</th>
          <th>Type</th>
          <th className="num">Amount</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {lendings.map((rec) => (
          <tr key={rec.id} className={rec.status === "settled" ? "row-muted" : ""}>
            <td>{rec.date}</td>
            <td>{rec.person_name}</td>
            <td>
              <span className={`tag ${rec.type === "lent" ? "tag-green" : "tag-red"}`}>
                {rec.type === "lent" ? "Lent" : "Borrowed"}
              </span>
            </td>
            <td className="num mono">₹{rec.amount.toFixed(2)}</td>
            <td>
              <button
                className={`status-btn ${rec.status}`}
                onClick={() => onToggleStatus(rec.id, rec.status === "pending" ? "settled" : "pending")}
              >
                {rec.status === "pending" ? "Pending" : "Settled"}
              </button>
            </td>
            <td>
              <button className="icon-btn" onClick={() => onDelete(rec.id)} aria-label="Delete record">
                ✕
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
