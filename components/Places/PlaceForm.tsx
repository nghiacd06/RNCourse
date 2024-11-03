import { useCallback, useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/globalStyles";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/place";

type PlaceFormProps = {
  onCreatePlace: (data: Place) => void;
};

const PlaceForm = ({ onCreatePlace }: PlaceFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);

  const onImageTaken = useCallback((image: string) => {
    setImage(image);
  }, []);

  const onLocationTaken = useCallback(
    (location: { lat: number; lng: number; address: string }) => {
      setLocation(location);
    },
    []
  );

  const handleSavePlace = () => {
    if (location) {
      const submitData: Place = {
        id: new Date().toString() + Math.random().toString(),
        title: title,
        imageUri: image,
        address: location?.address,
        location: {
          lat: location?.lat,
          lng: location?.lng,
        },
      };

      onCreatePlace(submitData);
    }
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          onChangeText={setTitle}
          value={title}
          style={styles.input}
        />
      </View>
      <View>
        <ImagePicker onTakeImage={onImageTaken} />
        <LocationPicker onTakeLocation={onLocationTaken} />
      </View>
      <Button onPress={handleSavePlace}>Add Place</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    margin: 12,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
