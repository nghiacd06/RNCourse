import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  FlatList,
  GestureResponderEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import TextInputCommon from "./components/TextInput/TextInput";
import ItemCommon, { ItemType } from "./components/Item/Item";

export default function App() {
  const [list, setList] = useState<ItemType[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onStartAddItem = () => {
    setModalVisible(true);
  };

  const onEndAddItem = () => {
    setModalVisible(false);
  };

  const onAddItem = (text: string) => {
    setList((prev) => [
      ...prev,
      {
        id: new Date().toISOString(),
        text,
      },
    ]);

    onEndAddItem();
  };

  const onDeleteItem = (itemId: string) => {
    setList((prev) => prev.filter((item) => item.id !== itemId));
  };

  return (
    <View style={styles.appContainer}>
      <Button
        title="Add new Item.."
        onPress={onStartAddItem}
        color="blue"
      />

      <TextInputCommon
        onAddItem={onAddItem}
        visible={modalVisible}
        onCancel={onEndAddItem}
      />

      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(item) => `${item.id}`}
          data={list}
          alwaysBounceVertical={false}
          renderItem={(info) => (
            <ItemCommon
              item={info.item}
              onRemoveItem={onDeleteItem}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  listContainer: {
    flex: 5,
  },
});
