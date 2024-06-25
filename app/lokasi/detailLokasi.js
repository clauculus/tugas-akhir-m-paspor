import { View, Text, Image, TextInput } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { colors } from "./../theme";
import { Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function DetailLokasi() {
  const router = useRouter();
  const { lokasi } = useLocalSearchParams();
  const detailLokasi = JSON.parse(lokasi);

  console.log(detailLokasi);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        height: "100%",
        flex: 1,
      }}
    >
      <Ionicons
        name="chevron-back"
        color={colors.darkBlue}
        size={26}
        onPress={() => router.back()}
      />
      <Text>{detailLokasi.lokasi.nama}</Text>
      <Text>{detailLokasi.lokasi.jarak}</Text>
    </SafeAreaView>
  );
}
