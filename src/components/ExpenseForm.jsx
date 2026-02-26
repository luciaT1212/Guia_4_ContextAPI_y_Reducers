import { useContext, useEffect, useState } from "react"
import { categories } from "../data/categories"
import DatePicker from "react-date-picker"
import "react-date-picker/dist/DatePicker.css"
import "react-calendar/dist/Calendar.css"
import {
  BudgetDispatchContext,
  BudgetStateContext,
} from "../context/BudgetContext"
import ErrorMessage from "./ErrorMessage"

export const ExpenseForm = () => {
  const [expense, setExpense] = useState({
    expenseName: "",
    amount: 0,
    category: "",
    date: new Date(),
  })

  const [error, setError] = useState("")
  const dispatch = useContext(BudgetDispatchContext)
  const state = useContext(BudgetStateContext)

  // Cargar datos al editar
  useEffect(() => {
    if (!state.editingId) return

    const selectedExpense = state.expenses.find((e) => e.id === state.editingId)
    if (selectedExpense) {
      setExpense({
        ...selectedExpense,
        date: selectedExpense.date ? new Date(selectedExpense.date) : new Date(),
      })
    }
  }, [state.editingId, state.expenses])

  const handleChange = (e) => {
    const { name, value } = e.target
    const isAmount = name === "amount"

    setExpense({
      ...expense,
      [name]: isAmount ? Number(value) : value,
    })
  }

  const handleChangeDate = (value) => {
    setExpense({
      ...expense,
      date: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validación básica
    if (
      expense.expenseName.trim() === "" ||
      expense.category === "" ||
      expense.amount <= 0 ||
      Number.isNaN(expense.amount)
    ) {
      setError("Todos los Campos son Obligatorios")
      return
    }

    // ✅ Validación: NO exceder presupuesto
    const totalExpenses = state.expenses.reduce((total, e) => total + e.amount, 0)

    // Si editas, resta el gasto anterior para no contarlo doble
    const previousAmount = state.editingId
      ? state.expenses.find((e) => e.id === state.editingId)?.amount ?? 0
      : 0

    const newTotal = totalExpenses - previousAmount + expense.amount

    if (newTotal > state.budget) {
      setError("Ese gasto sobrepasa tu presupuesto 😭")
      return
    }

    // Add / Update
    if (state.editingId) {
      dispatch({ type: "update-expense", payload: { expense } })
    } else {
      dispatch({ type: "add-expense", payload: { expense } })
    }

    // Reset del form
    setExpense({
      expenseName: "",
      amount: 0,
      category: "",
      date: new Date(),
    })
    setError("")
  }

  const isEditing = Boolean(state.editingId)

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        {isEditing ? "Guardar cambios" : "Nuevo gasto"}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Añade el Nombre del gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Añade la Cantidad del gasto: ej. 300"
          className="bg-slate-100 p-2"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoría:
        </label>
        <select
          id="category"
          className="bg-slate-100 p-2"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value=""> -- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xl">Fecha Gasto:</label>
        <DatePicker
          className="bg-slate-100 p-2 border-0"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value={isEditing ? "Guardar cambios" : "Registrar gasto"}
      />
    </form>
  )
}