import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import Meal from "../models/meal";

type MealDetailsProps = {
  data: Meal;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const MealDetails = ({ data, style, textStyle }: MealDetailsProps) => {
  const { complexity, duration, affordability } = data;

  return (
    <View style={[styles.details, style]}>
      <Text style={[styles.detailItem, textStyle]}>{duration}m</Text>
      <Text style={[styles.detailItem, textStyle]}>
        {complexity.toUpperCase()}
      </Text>
      <Text style={[styles.detailItem, textStyle]}>
        {affordability.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});

export default MealDetails;
