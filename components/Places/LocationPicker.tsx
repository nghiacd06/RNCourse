import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutlineButton from "../UI/OutlineButton";
import { Colors } from "../../constants/globalStyles";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { useEffect, useState } from "react";
import { getMapAddress, getMapPreview } from "../../utils/location";
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackNavigationParamList } from "../../App";

type LocationPickerProps = {
  onTakeLocation: (location: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
};

const LocationPicker = ({ onTakeLocation }: LocationPickerProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackNavigationParamList>>();

  const route = useRoute<RouteProp<RootStackNavigationParamList, "AddPlace">>();
  const [pickedLocation, setPickedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const isFocused = useIsFocused();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = route?.params && {
        lat: route?.params?.pickedLat,
        lng: route?.params?.pickedLng,
      };

      setPickedLocation(mapPickedLocation);
    }
  }, [isFocused, route]);

  useEffect(() => {
    const handleLocation = async () => {
      if (pickedLocation) {
        const address = await getMapAddress(pickedLocation);
        onTakeLocation({ ...pickedLocation, address });
      }
    };

    handleLocation();
  }, [pickedLocation]);

  const verifyPermission = async () => {
    if (
      locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );

      return false;
    }

    return true;
  };

  const handleGetLocation = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();

    setPickedLocation({
      lat: location?.coords?.latitude,
      lng: location?.coords?.longitude,
    });
  };

  const handlePickOnMap = () => {
    navigation.navigate("Map");
  };

  const renderMapPreview = () => {
    if (!pickedLocation) {
      return <Text>No location picked yet.</Text>;
    }

    return (
      <Image
        source={{
          uri: getMapPreview({
            lat: pickedLocation?.lat,
            lng: pickedLocation?.lng,
          }),
        }}
        style={styles.image}
      />
    );
  };

  return (
    <View>
      <View style={styles.mapPreview}>{renderMapPreview()}</View>
      <View style={styles.actions}>
        <OutlineButton
          icon="location"
          onPress={handleGetLocation}
        >
          Locate User
        </OutlineButton>
        <OutlineButton
          icon="map"
          onPress={handlePickOnMap}
        >
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    // overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default LocationPicker;
