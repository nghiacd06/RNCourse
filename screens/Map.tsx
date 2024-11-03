import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { MapPressEvent, Marker, Region } from "react-native-maps";
import { RootStackNavigationParamList } from "../App";
import IconButton from "../components/UI/IconButton";

type MapProps = NativeStackScreenProps<RootStackNavigationParamList, "Map"> & {
  // to add some props
};

const Map = ({ route, navigation }: MapProps) => {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(initialLocation);

  const region: Region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const onSelectLocation = (event: MapPressEvent) => {
    if (initialLocation) {
      return;
    }

    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat, lng });
  };

  const handleSavePickedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("No location picked!", "You have to pick a location first");
      return;
    }

    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    // if on view only mode
    if (initialLocation) {
      return;
    }

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor ?? "white"}
          onPress={handleSavePickedLocation}
        />
      ),
    });
  }, [navigation, handleSavePickedLocation, initialLocation]);

  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={onSelectLocation}
    >
      {selectedLocation && (
        <Marker
          title="Selected location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
