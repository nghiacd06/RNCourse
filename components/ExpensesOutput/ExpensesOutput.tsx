import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import { Expense } from "../../types/Expense";
import ExpensesList from "./ExpensesList";
import { globalStyles } from "../../constants/styles";

export type ExpensesOutputProps = {
  expenses: Expense[];
  expensesPeriod: string;
  fallbackText?: string;
};

const ExpensesOutput = ({
  expenses,
  expensesPeriod,
  fallbackText,
}: ExpensesOutputProps) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary
        expenses={expenses}
        periodName={expensesPeriod}
      />
      {expenses.length ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <Text style={styles.infoText}>{fallbackText ?? "Empty"}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: globalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});

export default ExpensesOutput;
