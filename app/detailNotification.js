import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { colors } from "./theme";
import { Button, ScrollView } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { faqData } from "./notification";

export default function Notification() {
  const router = useRouter();
  const { index } = useLocalSearchParams();

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        height: "100%",
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("../assets/images/gradient-bg.png")}
        style={styles.navbar}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="chevron-back"
            color={colors.white}
            size={26}
            onPress={() => router.back()}
          />
          <View>
            <Text style={styles.navbarText}>Detail Notifikasi</Text>
          </View>
        </View>
      </ImageBackground>
      <ScrollView style={{ paddingTop: 20, paddingHorizontal: 19 }}>
        <Text
          style={{
            fontFamily: "FiraSansSemiBold",
            fontSize: 20,
            color: colors.darkBlue,
            marginBottom: 4,
            width: "85%",
            // backgroundColor: "pink",
          }}
        >
          {faqData[index].question}
        </Text>
        <Text
          style={{
            fontFamily: "FiraSansRegular",
            color: colors.inactive,
            marginTop: 4,
          }}
        >
          {faqData[index].date}
        </Text>
        <View
          style={{
            fontFamily: "FiraSansRegular",
            fontSize: 15,
            color: "black",
            marginTop: 24,
            marginBottom: 6,
          }}
        >
          {faqData[index].fullText}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  navbar: {
    height: 80,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 10,
    // padding: 10,
    flexDirection: "row",
  },
  navbarText: {
    color: "white",
    fontFamily: "FiraSansMedium",
    fontSize: 20,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  item: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingTop: 10,
    paddingBottom: 20,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionText: {
    fontSize: 18,
    fontFamily: "FiraSansMedium",
    color: colors.darkBlue,
  },
  buttonText: {
    fontSize: 18,
  },
  answerText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "FiraSansRegular",
  },
});
