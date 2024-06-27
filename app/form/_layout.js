import { Stack } from "expo-router";

export default function Form() {
  return (
    <Stack>
      <Stack.Screen name="detailPermohonan" options={{ headerShown: false }} />
      <Stack.Screen name="step1" options={{ headerShown: false }} />
      <Stack.Screen name="step2" options={{ headerShown: false }} />
      <Stack.Screen name="step3" options={{ headerShown: false }} />
      <Stack.Screen name="step4" options={{ headerShown: false }} />
    </Stack>
  );
}
