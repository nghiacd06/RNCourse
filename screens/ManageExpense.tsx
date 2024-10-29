import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { RootStackNavigationParamList } from "../App";
import { useContext, useLayoutEffect, useMemo } from "react";
import IconButton from "../components/UI/IconButton";
import { globalStyles } from "../constants/styles";
import CustomButton from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";

const ManageExpense = () => {
  const { params } =
    useRoute<RouteProp<RootStackNavigationParamList, "ManageExpense">>();
  const navigation =
    useNavigation<
      NavigationProp<RootStackNavigationParamList, "ManageExpense">
    >();
  const { expenses, addExpense, updateExpense, deleteExpense } =
    useContext(ExpensesContext);

  const editedExpenseId = params?.expenseId;

  const editingExpense = useMemo(
    () => expenses.find((item) => item.id === editedExpenseId),
    [editedExpenseId]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: editingExpense ? "Edit Expense" : "Add Expense",
    });
  }, [editingExpense, navigation]);

  const onDeleteExpense = () => {
    if (!editingExpense) {
      return;
    }

    deleteExpense(editingExpense.id);
    navigation.goBack();
  };

  const onCancel = () => {
    navigation.goBack();
  };

  const onConfirm = () => {
    if (!editingExpense) {
      addExpense({
        description: "test add",
        amount: 112.59,
        date: new Date(),
      });
      navigation.goBack();
      return;
    }

    updateExpense(editingExpense.id, {
      description: "test update",
      amount: 112.59,
      date: new Date(),
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <CustomButton
          mode="flat"
          onPress={onCancel}
          style={styles.button}
        >
          Cancel
        </CustomButton>
        <CustomButton
          onPress={onConfirm}
          style={styles.button}
        >
          {!!editingExpense ? "Update" : "Add"}
        </CustomButton>
      </View>
      {!!editingExpense && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={globalStyles.colors.error500}
            size={24}
            onPress={onDeleteExpense}
          />
        </View>
      )}
      <Text>Manage Expense</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: globalStyles.colors.primary700,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    paddingTop: 8,
    marginTop: 16,
    borderTopWidth: 2,
    borderTopColor: globalStyles.colors.primary200,
    alignItems: "center",
  },
});

export default ManageExpense;
