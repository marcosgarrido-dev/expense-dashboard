import StatusBadge from "./StatusBadge"

function ExpenseRow({ expense }) {
  return (
    <tr>
      <td>{expense.employee}</td>
      <td>{expense.department}</td>
      <td>€{expense.amount}</td>
      <td>
        <StatusBadge status={expense.status} />
      </td>
    </tr>
  )
}

export default ExpenseRow