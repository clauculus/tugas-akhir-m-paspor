import { Stack } from "expo-router";

export default function Form() {
  return (
    <Stack>
      <Stack.Screen name="detailPermohonan" options={{ headerShown: false }} />
    </Stack>
  );
}
