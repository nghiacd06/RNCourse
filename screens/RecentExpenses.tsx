import { Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";

const RecentExpenses = () => {
  const { expenses } = useContext(ExpensesContext);

  const recentExpenses = expenses.filter((expenses) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expenses.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
};

export default RecentExpenses;
