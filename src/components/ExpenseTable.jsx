import ExpenseRow from "./ExpenseRow"

function ExpenseTable({ expenses }) {
  return (
    <div className="table-container">
      <h2>Expense Requests</h2>

      <table className="expense-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Department</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <ExpenseRow key={expense.id} expense={expense} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ExpenseTable