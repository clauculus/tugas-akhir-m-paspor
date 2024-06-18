import { Tabs } from "expo-router";

export default function HomeLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="beranda" options={{ title: "Beranda" }} />
      <Tabs.Screen name="permohonan" options={{ title: "Permohonan" }} />
      <Tabs.Screen name="bantuan" options={{ title: "Bantuan" }} />
    </Tabs>
  );
}
