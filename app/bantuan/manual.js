import { View, Text, Image, TextInput } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { colors } from "./../theme";
import { Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Manual() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        height: "100%",
        flex: 1,
      }}
    >
      <Text>Manual</Text>
    </SafeAreaView>
  );
}
