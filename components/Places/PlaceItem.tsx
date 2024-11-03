import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Place } from "../../models/place";
import { Colors } from "../../constants/globalStyles";

type PlaceItemProps = {
  place: Place;
  onSelect: (placeId: string) => void;
};

const PlaceItem = ({ place, onSelect }: PlaceItemProps) => {
  return (
    <Pressable
      onPress={() => onSelect(place.id)}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Image
        source={{ uri: place.imageUri }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
});
