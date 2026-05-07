import { useState } from "react"

function AddExpenseForm({ onAddExpense }) {
  const [employee, setEmployee] = useState("")
  const [department, setDepartment] = useState("")
  const [amount, setAmount] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!employee || !department || !amount) return

    const newExpense = {
      id: Date.now(),
      employee,
      department,
      amount: Number(amount),
      status: "Pending"
    }

    onAddExpense(newExpense)

    setEmployee("")
    setDepartment("")
    setAmount("")
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Employee"
        value={employee}
        onChange={(e) => setEmployee(e.target.value)}
      />

      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button type="submit">Add Expense</button>
    </form>
  )
}

export default AddExpenseForm