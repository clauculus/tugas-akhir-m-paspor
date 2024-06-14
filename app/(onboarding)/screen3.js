import { View, Button, Text } from "react-native";
import { useNavigation } from "expo-router";

export default function OnboardingScreen3() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Onboarding Screen 3</Text>
      <Button title="Finish" onPress={() => navigation.navigate("home")} />
    </View>
  );
}
