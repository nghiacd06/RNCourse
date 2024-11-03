import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PlacesList from "../components/Places/PlaceList";
import { RootStackNavigationParamList } from "../App";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Place } from "../models/place";
import { fetchPlaces } from "../utils/database";

type AllPlacesProps = NativeStackScreenProps<
  RootStackNavigationParamList,
  "AllPlaces"
> & {
  // to add some props
};

const AllPlaces = ({ route }: AllPlacesProps) => {
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadPlaces();
      // const place = route.params.place;
      // if (place) {
      //   setLoadedLocation((prev) => [...prev, place]);
      // }
    }
  }, [isFocused, route.params]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
