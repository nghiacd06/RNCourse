import { ExpenseFormBody } from "../components/ManageExpense/ExpenseForm";
import axios from "axios";
import { Expense } from "../types/Expense";

const baseUrl = "https://rncourse-30376-default-rtdb.firebaseio.com";

const fetchExpenses = async () => {
  const res = await axios.get(`${baseUrl}/expenses.json`);

  const expenses: Expense[] = [];

  for (const key in res.data) {
    const expenseObj = {
      id: key,
      amount: res.data[key].amount,
      date: new Date(res.data[key].date),
      description: res.data[key].description,
    };

    expenses.push(expenseObj);
  }

  return expenses;
};

const storeExpense = async (expenseData: ExpenseFormBody) => {
  const res = await axios.post(`${baseUrl}/expenses.json`, expenseData);
  const id = res.data.name; // firebase docs

  return id;
};

const updateExpense = async (id: string, updateData: ExpenseFormBody) => {
  return await axios.put(`${baseUrl}/expenses/${id}.json`, updateData);
};

const deleteExpense = async (id: string) => {
  return await axios.delete(`${baseUrl}/expenses/${id}.json`);
};

export { storeExpense, fetchExpenses, updateExpense, deleteExpense };
