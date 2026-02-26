import { createContext, useEffect, useReducer } from "react"
import { budgetReducer, initialState } from "../reducers/budget-reducer"
import { getFromStorage, saveToStorage } from "../helpers"

export const BudgetStateContext = createContext()
export const BudgetDispatchContext = createContext()

export const BudgetProvider = ({ children }) => {
  const storedState = getFromStorage("budgetApp", initialState)

  const [state, dispatch] = useReducer(budgetReducer, storedState)

  useEffect(() => {
    saveToStorage("budgetApp", state)
  }, [state])

  return (
    <BudgetStateContext.Provider value={state}>
      <BudgetDispatchContext.Provider value={dispatch}>
        {children}
      </BudgetDispatchContext.Provider>
    </BudgetStateContext.Provider>
  )
}