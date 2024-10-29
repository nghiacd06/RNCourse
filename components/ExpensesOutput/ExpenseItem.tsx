import { Pressable, StyleSheet, Text, View } from "react-native";
import { Expense } from "../../types/Expense";
import { globalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../utils/date";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackNavigationParamList } from "../../App";

export type ExpensesItemProps = {
  expense: Expense;
};

const ExpensesItem = ({ expense }: ExpensesItemProps) => {
  const navigation =
    useNavigation<NavigationProp<RootStackNavigationParamList>>();
  const onPress = () => {
    navigation.navigate("ManageExpense", { expenseId: expense.id });
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.container}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {expense.description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(expense.date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.textBase, styles.amount]}>
            ${expense.amount.toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: globalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 6,
    elevation: 4,
    shadowColor: globalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: globalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  amount: {
    fontWeight: "bold",
    color: globalStyles.colors.primary500,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default ExpensesItem;
