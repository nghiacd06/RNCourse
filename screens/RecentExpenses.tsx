import { Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/UI/Loadingoverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const { expenses, setExpenses } = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        setExpenses(expenses);
      } catch (error) {
        setErrMessage("Could not fetch expenses");
      }
      setIsFetching(false);
    };

    getExpenses();
  }, []);

  const handleError = () => {
    setErrMessage("");
  };

  if (errMessage && !isFetching) {
    return (
      <ErrorOverlay
        message={errMessage}
        onConfirm={handleError}
      />
    );
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

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
