import { useState } from "react"
import { expenses } from "./data/expenses"
import DashboardCard from "./components/DashboardCard"
import ExpenseTable from "./components/ExpenseTable"
import { useLocalStorage } from "./hooks/useLocalStorage"
import AddExpenseForm from "./components/AddExpenseForm"

function App() {
  const [expenseList, setExpenseList] = useLocalStorage("expenses", expenses)
  const [statusFilter, setStatusFilter] = useState("All")
  const ANNUAL_BUDGET = 50000

  const approvedBudget = expenseList
    .filter((expense) => expense.status === "Approved")
    .reduce((total, expense) => total + expense.amount, 0)

  
  const [budgetMessage, setBudgetMessage] = useState("")

  const rejectedCount = expenseList.filter(
    (expense) => expense.status === "Rejected"
  ).length

   const pendingCount = expenseList.filter(
    (expense) => expense.status === "Pending"
  ).length

  const approvedCount = expenseList.filter(
    (expense) => expense.status === "Approved"
  ).length

  const updateExpenseStatus = (id, newStatus) => {
    const expenseToUpdate = expenseList.find(
      (expense) => expense.id === id
    )

    // Validate annual budget only for approved expenses
    if (newStatus === "Approved") {

      const futureApprovedBudget =
        approvedBudget + expenseToUpdate.amount

      if (futureApprovedBudget > ANNUAL_BUDGET) {

        setBudgetMessage(
          "No budget available. This request will be postponed to next year."
        )

        return
      }
    }

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

  const addExpense = (newExpense) => {
  const newRequestedBudget = approvedBudget + newExpense.amount

  if (newRequestedBudget > ANNUAL_BUDGET) {
      setBudgetMessage(
        "No budget available. This request will be postponed to next year."
      )

      return
    }
    setExpenseList([newExpense, ...expenseList])
  }

  const filteredExpenses = statusFilter === "All" ? expenseList : expenseList.filter((expense) => expense.status === statusFilter)

  const pendingTotal = expenseList
    .filter((expense) => expense.status === "Pending")
    .reduce((total, expense) => total + expense.amount, 0)

  const approvedTotal = expenseList
    .filter((expense) => expense.status === "Approved")
    .reduce((total, expense) => total + expense.amount, 0)

  const rejectedTotal = expenseList
    .filter((expense) => expense.status === "Rejected")
    .reduce((total, expense) => total + expense.amount, 0)
  

  const remainingBudget = ANNUAL_BUDGET - approvedTotal
  return (
    <div className="app">
      <h1>Expense Approval Dashboard</h1>
      <div className="dashboard-cards">
        <DashboardCard
          title="Annual Budget"
          value={`€${ANNUAL_BUDGET}`}
          type="total"
        />

        <DashboardCard
          title="Remaining Budget"
          value={`€${remainingBudget}`}
          type="total"
        />

        <DashboardCard
          title="Pending"
          value={`${pendingCount} requests · €${pendingTotal}`}
          type="pending"
        />

        <DashboardCard
          title="Approved"
          value={`${approvedCount} requests · €${approvedTotal}`}
          type="approved"
        />

        <DashboardCard
          title="Rejected"
          value={`${rejectedCount} requests · €${rejectedTotal}`}
          type="rejected"
        />

      </div>
      {budgetMessage && (
        <div className="budget-popup">
          <p>{budgetMessage}</p>
          <button onClick={() => setBudgetMessage("")}>Close</button>
        </div>
      )}
      <AddExpenseForm onAddExpense={addExpense} />
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