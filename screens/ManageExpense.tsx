import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { RootStackNavigationParamList } from "../App";
import { useContext, useLayoutEffect, useMemo } from "react";
import IconButton from "../components/UI/IconButton";
import { globalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { Expense } from "../types/Expense";

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

  const onConfirm = (
    expenseData: Pick<Expense, "amount" | "description" | "date">
  ) => {
    if (!editingExpense) {
      addExpense(expenseData);
    } else {
      updateExpense(editingExpense.id, expenseData);
    }

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <ExpenseForm
            submitButtonLabel={!!editingExpense ? "Update" : "Add"}
            onCancel={onCancel}
            onConfirm={onConfirm}
            defaultValues={editingExpense}
          />

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
        </View>
      </TouchableNativeFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: globalStyles.colors.primary800,
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
