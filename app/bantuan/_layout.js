import { Stack } from "expo-router";

export default function Form() {
  return (
    <Stack>
      <Stack.Screen name="faq" options={{ headerShown: false }} />
      <Stack.Screen name="manual" options={{ headerShown: false }} />
      <Stack.Screen name="chatbot" options={{ headerShown: false }} />
    </Stack>
  );
}
