import { useContext } from "react"
import { BudgetStateContext } from "../context/BudgetContext"
import { ExpenseDetails } from "./ExpenseDetails"

export const ExpenseList = () => {
  const { expenses } = useContext(BudgetStateContext)

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-black text-gray-700">
        {expenses.length ? "Gastos" : "No hay gastos aún"}
      </h2>

      <div className="mt-5 space-y-5">
        {expenses.map((expense) => (
          <ExpenseDetails key={expense.id ?? expense.expenseName} expense={expense} />
        ))}
      </div>
    </div>
  )
}