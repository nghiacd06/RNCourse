import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";

import {
  ImagePickerResult,
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/globalStyles";
import OutlineButton from "../UI/OutlineButton";

type ImagePickerProps = {
  onTakeImage: (image: string) => void;
};

const ImagePicker = ({ onTakeImage }: ImagePickerProps) => {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const [pickedImage, setPickedImage] = useState<string | null>(null);

  const verifyPermission = async () => {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );

      return false;
    }

    return true;
  };

  const handleTakeImage = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (image?.assets?.[0].uri) {
      setPickedImage(image?.assets?.[0].uri);
      onTakeImage(image?.assets?.[0].uri);
    }
  };

  const renderImagePreviewComponent = () => {
    if (!pickedImage) {
      return <Text>No image picked</Text>;
    }

    return (
      <Image
        source={{ uri: pickedImage }}
        style={styles.image}
      />
    );
  };

  return (
    <View>
      <View style={styles.imagePreview}>{renderImagePreviewComponent()}</View>
      <OutlineButton
        icon="camera"
        onPress={handleTakeImage}
      >
        Take image
      </OutlineButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    // overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
