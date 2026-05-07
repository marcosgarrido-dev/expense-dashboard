import { useState } from "react"
import { expenses } from "./data/expenses"
import DashboardCard from "./components/DashboardCard"
import ExpenseTable from "./components/ExpenseTable"

function App() {
  const [expenseList, setExpenseList] = useState(expenses)

  const totalExpenses = expenseList.reduce(
  (total, expense) => total + expense.amount,
  0
  )

  const pendingCount = expenseList.filter(
    (expense) => expense.status === "Pending"
  ).length

  const approvedCount = expenseList.filter(
    (expense) => expense.status === "Approved"
  ).length

  const rejectedCount = expenseList.filter(
    (expense) => expense.status === "Rejected"
  ).length

  // console.log(expenseList)

  return (
    <div className="app">
      <h1>Expense Approval Dashboard</h1>
      <div className="dashboard-cards">
        <DashboardCard
          title="Total Expenses"
          value={`€${totalExpenses}`}
          type="total"
        />

        <DashboardCard
          title="Pending"
          value={pendingCount}
          type="pending"
        />

        <DashboardCard
          title="Approved"
          value={approvedCount}
          type="approved"
        />

        <DashboardCard
          title="Rejected"
          value={rejectedCount}
          type="rejected"
        />
      </div>
      <ExpenseTable expenses={expenseList} />
    </div>
  )
}

export default App