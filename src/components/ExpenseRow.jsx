import StatusBadge from "./StatusBadge"

function ExpenseRow({ expense, onUpdateStatus }) {
  return (
    <tr>
      <td>{expense.employee}</td>
      <td>{expense.department}</td>
      <td>€{expense.amount}</td>
      <td>
        <StatusBadge status={expense.status} />
      </td>
      <td>
        {expense.status === "Pending" && (
          <div className="table-actions">
            <button
              className="approve-btn"
              onClick={() => onUpdateStatus(expense.id, "Approved")}
            >
              Approve
            </button>

            <button
              className="reject-btn"
              onClick={() => onUpdateStatus(expense.id, "Rejected")}
            >
              Reject
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}

export default ExpenseRow