import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import { Expense } from "../../types/Expense";
import CustomButton from "../UI/Button";
import { getFormattedDate } from "../../utils/date";

export type ExpenseFormBody = Pick<Expense, "amount" | "description" | "date">;

type ExpenseFormProps = {
  defaultValues?: ExpenseFormBody;
  submitButtonLabel: string;
  onConfirm: (expenseData: ExpenseFormBody) => void;
  onCancel: () => void;
};

const ExpenseForm = ({
  defaultValues,
  submitButtonLabel,
  onConfirm,
  onCancel,
}: ExpenseFormProps) => {
  const [inputs, setInputs] = useState<
    Record<
      keyof ExpenseFormBody,
      {
        isValid: boolean;
        value: string;
      }
    >
  >({
    amount: {
      isValid: !!defaultValues,
      value: defaultValues ? defaultValues?.amount?.toString() : "",
    },
    description: {
      isValid: !!defaultValues,
      value: defaultValues?.description ?? "",
    },
    date: {
      isValid: !!defaultValues,
      value: defaultValues?.date ? getFormattedDate(defaultValues?.date) : "",
    },
  });

  const onInputChange = (
    inputType: keyof Pick<Expense, "amount" | "description" | "date">,
    value: string
  ) => {
    setInputs((prev) => ({
      ...prev,
      [inputType]: {
        isValid: true,
        value,
      },
    }));
  };

  const handleSubmit = () => {
    const submitData: ExpenseFormBody = {
      amount: +inputs.amount.value,
      description: inputs.description.value,
      date: new Date(inputs.date.value),
    };

    const amountIsValid = !isNaN(submitData.amount) && submitData.amount > 0;
    const dateIsValid = submitData.date.toString() !== "Invalid Date";
    const descriptionIsValid = submitData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //   Alert.alert("Invalid Input", "Please check your input values.");
      setInputs((prev) => ({
        amount: {
          isValid: amountIsValid,
          value: prev.amount.value,
        },
        date: {
          isValid: dateIsValid,
          value: prev.date.value,
        },
        description: {
          isValid: descriptionIsValid,
          value: prev.description.value,
        },
      }));
      return;
    }

    onConfirm(submitData);
  };

  return (
    <View>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          textInputConfigs={{
            keyboardType: "decimal-pad",
            onChangeText: onInputChange.bind(this, "amount"),
            value: inputs.amount.value,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          textInputConfigs={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: onInputChange.bind(this, "date"),
            value: inputs.date.value,
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        textInputConfigs={{
          multiline: true,
          onChangeText: onInputChange.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      <View style={styles.buttons}>
        <CustomButton
          mode="flat"
          onPress={onCancel}
          style={styles.button}
        >
          Cancel
        </CustomButton>
        <CustomButton
          onPress={handleSubmit}
          style={styles.button}
        >
          {submitButtonLabel}
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
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
});

export default ExpenseForm;
