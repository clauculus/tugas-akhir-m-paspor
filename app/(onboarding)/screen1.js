import { View, Button, Text } from "react-native";
import { useNavigation } from "expo-router";

export default function OnboardingScreen1() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Onboarding Screen 1</Text>
      <Button
        title="Next"
        onPress={() => navigation.navigate("onboarding/screen2")}
      />
      <Button title="Skip" onPress={() => navigation.navigate("home")} />
    </View>
  );
}
