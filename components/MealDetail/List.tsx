import { View, Text, StyleSheet } from "react-native";

type ListProps = {
  data: string[];
};

const List = ({ data }: ListProps) => {
  return data?.map((ingredient, index) => (
    <View
      key={`${index}_${ingredient}`}
      style={styles.listItem}
    >
      <Text style={styles.itemText}>{ingredient}</Text>
    </View>
  ));
};

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginVertical: 8,
    marginHorizontal: 24,
    backgroundColor: "#b1923e",
  },
  itemText: {
    color: "#392b03",
    textAlign: "center",
  },
});

export default List;
