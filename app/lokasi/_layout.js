import { Stack } from "expo-router";

export default function Lokasi() {
  return (
    <Stack>
      <Stack.Screen name="hasilPencarian" options={{ headerShown: false }} />
      <Stack.Screen name="detailLokasi" options={{ headerShown: false }} />
      <Stack.Screen name="pilihJadwal" options={{ headerShown: false }} />
      <Stack.Screen name="rangkumJadwal" options={{ headerShown: false }} />
    </Stack>
  );
}
