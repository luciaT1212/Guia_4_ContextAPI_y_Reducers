import { useContext } from "react"
import { categories } from "../data/categories"
import { BudgetDispatchContext } from "../context/BudgetContext"

import {
  SwipeableList,
  SwipeableListItem,
  LeadingActions,
  TrailingActions,
  SwipeAction,
} from "react-swipeable-list"
import "react-swipeable-list/dist/styles.css"

export const ExpenseDetails = ({ expense }) => {
  const categoryInfo = categories.find((cat) => cat.id === expense.category)
  const dispatch = useContext(BudgetDispatchContext)

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() =>
          dispatch({ type: "get-expense-by-id", payload: { id: expense.id } })
        }
      >
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() =>
          dispatch({ type: "remove-expense", payload: { id: expense.id } })
        }
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  const iconUrl = categoryInfo
    ? `${import.meta.env.BASE_URL}icono_${categoryInfo.icon}.svg`
    : ""

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
          <div>
            {categoryInfo && (
              <img src={iconUrl} alt="Icono gasto" className="w-20" />
            )}
          </div>

          <div className="flex-1">
            <p className="text-sm font-bold uppercase text-slate-500">
              {categoryInfo?.name ?? "Categoría"}
            </p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">
              {expense.date
                ? new Date(expense.date).toLocaleDateString("es-ES", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Fecha no disponible"}
            </p>
          </div>

          <div className="text-2xl text-blue-600 font-bold">
            <span className="font-black text-black"> ${expense.amount}</span>
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
