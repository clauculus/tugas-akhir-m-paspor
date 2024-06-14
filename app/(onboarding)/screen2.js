import { View, Button, Text } from "react-native";
import { useNavigation } from "expo-router";

export default function OnboardingScreen2() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Onboarding Screen 2</Text>
      <Button
        title="Next"
        onPress={() => navigation.navigate("onboarding/screen3")}
      />
      <Button title="Skip" onPress={() => navigation.navigate("home")} />
    </View>
  );
}
