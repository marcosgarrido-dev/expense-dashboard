import { useState } from "react"
import { expenses } from "./data/expenses"
import DashboardCard from "./components/DashboardCard"
import ExpenseTable from "./components/ExpenseTable"

function App() {
  const [expenseList, setExpenseList] = useState(expenses)
  const [statusFilter, setStatusFilter] = useState("All")

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


  const updateExpenseStatus = (id, newStatus) => {
    const updatedExpenses = expenseList.map((expense) => {
      if (expense.id === id) {
        return {
          ...expense,
          status: newStatus
        }
      }

      return expense
    })

    setExpenseList(updatedExpenses)
  }

  const filteredExpenses = statusFilter === "All" ? expenseList : expenseList.filter((expense) => expense.status === statusFilter)
  
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
      <div className="filters">
        {["All", "Pending", "Approved", "Rejected"].map((status) => (
          <button
            key={status}
            className={statusFilter === status ? "active-filter" : ""}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <ExpenseTable 
        expenses={filteredExpenses}
        onUpdateStatus={updateExpenseStatus} 
      />
    </div>
  )
}

export default App