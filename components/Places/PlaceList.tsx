import { FlatList, StyleSheet, Text, View } from "react-native";
import { Place } from "../../models/place";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackNavigationParamList } from "../../App";

type PlacesListProps = {
  places: Place[];
};

const PlacesList = ({ places }: PlacesListProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackNavigationParamList>>();

  if (!places?.length) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Empty places</Text>
      </View>
    );
  }

  const onSelectPlace = (placeId: Place["id"]) => {
    navigation.navigate("PlaceDetails", {
      placeId: placeId,
    });
  };

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          place={itemData.item}
          onSelect={onSelectPlace.bind(this, itemData.item.id)}
        />
      )}
      style={styles.list}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    color: Colors.primary200,
  },
  list: {
    margin: 24,
  },
});
