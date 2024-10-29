import { createContext, useReducer } from "react";
import { Expense } from "../types/Expense";

export const DUMMY_EXPENSES: Expense[] = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2024-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2024-01-05"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2024-12-11"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2024-12-19"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2024-12-18"),
  },
];

type ExpensesContextProps = {
  expenses: Expense[];
  addExpense: (data: Pick<Expense, "description" | "amount" | "date">) => void;
  deleteExpense: (id: Expense["id"]) => void;
  updateExpense: (
    id: Expense["id"],
    data: Pick<Expense, "description" | "amount" | "date">
  ) => void;
};

const initialValue: ExpensesContextProps = {
  expenses: DUMMY_EXPENSES,
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
};

const ExpensesContext = createContext(initialValue);

export { ExpensesContext };

// Define action types
type Action =
  | { type: "ADD"; payload: Pick<Expense, "description" | "amount" | "date"> }
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
      const id = new Date().toString() + Math.random().toString();
      return [{ id, ...action.payload }, ...expenses];
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
  const addExpense = (
    data: Pick<Expense, "description" | "amount" | "date">
  ) => {
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

  // Value to pass through context
  const value: ExpensesContextProps = {
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
