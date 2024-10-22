import { View, StyleSheet, Text, Pressable } from "react-native";

export type ItemType = {
  id: string;
  text: string;
};

type ItemCommon = {
  item: ItemType;
  onRemoveItem: (itemId: string) => void;
};

const ItemCommon = ({ item, onRemoveItem }: ItemCommon) => {
  //   const onPress = () => {
  //     onRemoveItem(item.id);
  //     console.log("onPress");
  //   };

  return (
    <View style={styles.item}>
      <Pressable
        onPress={onRemoveItem.bind(this, item.id)}
        android_ripple={{ color: "gray" }}
        style={(event) => event.pressed && styles.pressedItemText}
      >
        <Text style={styles.itemText}>{item.text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  pressedItemText: {
    opacity: 0.5,
  },
  itemText: {
    color: "white",
    padding: 8,
  },
});

export default ItemCommon;
