import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Expense } from "../../types/Expense";
import ExpensesItem from "./ExpenseItem";

export type ExpensesListProps = {
  expenses: Expense[];
};

const ExpensesList = ({ expenses }: ExpensesListProps) => {
  const renderExpenseItem = (itemData: ListRenderItemInfo<Expense>) => {
    return <ExpensesItem expense={itemData.item} />;
  };

  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({});

export default ExpensesList;
