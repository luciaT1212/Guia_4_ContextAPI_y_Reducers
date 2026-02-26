import { useContext } from "react"
import { BudgetDispatchContext, BudgetStateContext } from "../context/BudgetContext"
import { AmountDisplay } from "./AmountDisplay"

export const BudgetTracker = () => {
  const state = useContext(BudgetStateContext)
  const dispatch = useContext(BudgetDispatchContext)

  const totalExpenses = state.expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  )

  const remainingBudget = state.budget - totalExpenses

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <img src="/grafico.jpg" alt="grafico" />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
          onClick={() => {
            const ok = confirm("¿Seguro que quieres reiniciar la app?")
            if (ok) dispatch({ type: "reset-app" })
          }}
        >
          Resetear App
        </button>

        <AmountDisplay amount={state.budget} label="Presupuesto" />
        <AmountDisplay amount={remainingBudget} label="Disponible" />
        <AmountDisplay amount={totalExpenses} label="Gastado" />
      </div>
    </div>
  )
}