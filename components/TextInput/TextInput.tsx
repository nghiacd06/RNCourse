import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  Image,
} from "react-native";

type TextInputCommon = {
  visible: boolean;
  onAddItem: (text: string) => void;
  onCancel: () => void;
};

const TextInputCommon = ({ visible, onAddItem, onCancel }: TextInputCommon) => {
  const [text, setText] = useState<string>("");

  const onChangeText = (text: string) => {
    setText(text);
  };

  const onPressAdd = () => {
    onAddItem(text);
    setText("");
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
    >
      <View style={styles.inputContainer}>
        <Image
          source={require("../../assets/goal.png")}
          style={styles.image}
        />
        <TextInput
          value={text}
          placeholder="Text here..."
          style={styles.textInput}
          onChangeText={onChangeText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              color="#aa7fe1"
              title="Add"
              onPress={onPressAdd}
              disabled={!text}
            />
          </View>
          <View style={styles.button}>
            <Button
              color="#e52a2a"
              title="Cancel"
              onPress={onCancel}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#5e0acc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    marginRight: 8,
    padding: 16,
    borderRadius: 4,
    backgroundColor: "#e7e3ec",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  button: {
    width: "40%",
    marginHorizontal: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 16,
  },
});

export default TextInputCommon;
