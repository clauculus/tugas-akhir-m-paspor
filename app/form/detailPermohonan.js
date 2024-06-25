import { View, Text, Image, TextInput } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { colors } from "./../theme";
import { Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DetailPermohonan() {
  const router = useRouter();
  const { draftId } = useLocalSearchParams();

  const [draft, setDraft] = useState({});

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        console.log(draftId);
        const existingDrafts = await AsyncStorage.getItem("drafts");
        const drafts = existingDrafts ? JSON.parse(existingDrafts) : [];
        const currentDraft = drafts.find((d) => {
          d.id == draftId && setDraft(d);
        });
        // setDraft(currentDraft);
        console.log("hi", currentDraft);
        console.log("ini currentDraft", draft);
      } catch (error) {
        console.error("Failed to fetch the draft", error);
      }
    };

    fetchDraft();
  }, [draftId]);

  if (!draft) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log(draft, "drafttttttttttt");

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
      <Text>Location: {draft.selectedTime}</Text>
      <Text>Date: {draft.selectedDate}</Text>
      {/* <Text>Time: {draft.time}</Text> */}
    </SafeAreaView>
  );
}
