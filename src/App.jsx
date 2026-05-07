import { useState } from "react"
import { expenses } from "./data/expenses"

function App() {
  const [expenseList, setExpenseList] = useState(expenses)

  console.log(expenseList)

  return (
    <div className="app">
      <h1>Expense Approval Dashboard</h1>
    </div>
  )
}

export default App