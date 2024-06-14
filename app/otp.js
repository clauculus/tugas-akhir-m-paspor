import { View, Button, Text } from "react-native";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OTPScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View>
        <Text>Enter OTP</Text>
        <Button
          title="Submit OTP"
          onPress={() => navigation.navigate("onboarding")}
        />
      </View>
    </SafeAreaView>
  );
}
