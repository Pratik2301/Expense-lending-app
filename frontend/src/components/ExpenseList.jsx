export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <p className="empty-state">No expenses yet. Add your first one above.</p>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Title</th>
          <th>Category</th>
          <th className="num">Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((exp) => (
          <tr key={exp.id}>
            <td>{exp.date}</td>
            <td>{exp.title}</td>
            <td><span className="tag">{exp.category}</span></td>
            <td className="num mono">₹{exp.amount.toFixed(2)}</td>
            <td>
              <button className="icon-btn" onClick={() => onDelete(exp.id)} aria-label="Delete expense">
                ✕
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
