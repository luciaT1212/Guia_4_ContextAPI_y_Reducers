import { useContext, useState } from "react"
import { BudgetDispatchContext } from "../context/BudgetContext"

export default function BudgetForm() {
  const [budget, setBudget] = useState(0)
  const isInvalid = isNaN(budget) || budget <= 0
  const dispatch = useContext(BudgetDispatchContext)

  const handleChange = (e) => setBudget(e.target.valueAsNumber)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({ type: "add-budget", payload: { budget } })
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
          Definir presupuesto
        </label>

        <input
          type="number"
          id="budget"
          placeholder="Define tu presupuesto"
          className="w-full bg-white border border-gray-200 p-2"
          value={budget}
          onChange={handleChange}
        />

        <input
          type="submit"
          value="Definir presupuesto"
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-bold uppercase disabled:opacity-40"
          disabled={isInvalid}
        />
      </div>
    </form>
  )
}