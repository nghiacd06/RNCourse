import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PlaceForm from "../components/Places/PlaceForm";
import { RootStackNavigationParamList } from "../App";
import { Place } from "../models/place";
import { insertPlace } from "../utils/database";

type AddPlaceProps = NativeStackScreenProps<
  RootStackNavigationParamList,
  "AddPlace"
> & {
  // to add some props
};

const AddPlace = ({ navigation }: AddPlaceProps) => {
  const handleNavigate = async (data: Place) => {
    await insertPlace(data);
    navigation.navigate("AllPlaces");
  };

  return <PlaceForm onCreatePlace={handleNavigate} />;
};

export default AddPlace;
