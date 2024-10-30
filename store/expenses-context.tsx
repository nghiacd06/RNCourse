import { createContext, useReducer } from "react";
import { Expense } from "../types/Expense";

type ExpensesContextProps = {
  expenses: Expense[];
  addExpense: (data: Expense) => void;
  setExpenses: (expenses: Expense[]) => void;
  deleteExpense: (id: Expense["id"]) => void;
  updateExpense: (
    id: Expense["id"],
    data: Pick<Expense, "description" | "amount" | "date">
  ) => void;
};

const initialValue: ExpensesContextProps = {
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: ([]) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
};

const ExpensesContext = createContext(initialValue);

export { ExpensesContext };

// Define action types
type Action =
  | { type: "ADD"; payload: Expense }
  | { type: "SET"; payload: Expense[] }
  | { type: "DELETE"; payload: { id: Expense["id"] } }
  | {
      type: "UPDATE";
      payload: {
        id: Expense["id"];
        data: Pick<Expense, "description" | "amount" | "date">;
      };
    };

const expensesReducer = (expenses: Expense[], action: Action): Expense[] => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...expenses];
    case "SET":
      return action.payload.reverse();
    case "UPDATE":
      const updatableExpenseIndex = expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = expenses[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...expenses];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return expenses.filter((expense) => expense.id !== action.payload.id);

    default:
      return expenses;
  }
};

const ExpensesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expenses, dispatch] = useReducer(
    expensesReducer,
    initialValue.expenses
  );

  // Define functions that dispatch actions
  const addExpense = (data: Expense) => {
    dispatch({ type: "ADD", payload: data });
  };

  const deleteExpense = (id: Expense["id"]) => {
    dispatch({ type: "DELETE", payload: { id } });
  };

  const updateExpense = (
    id: Expense["id"],
    data: Pick<Expense, "description" | "amount" | "date">
  ) => {
    dispatch({ type: "UPDATE", payload: { id, data } });
  };

  const setExpenses = (expenses: Expense[]) => {
    dispatch({ type: "SET", payload: expenses });
  };

  // Value to pass through context
  const value: ExpensesContextProps = {
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
    setExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
