import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { colors } from "./../theme";
import { Button, ScrollView } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const faqData = [
  {
    question: "Apa perbedaan paspor elektronik dan paspor biasa?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac ornare eros. Proin est arcu, tempor ac dolor ac, efficitur volutpat erat. ",
  },
  {
    question: "BoDYYY?",
    answer: "BANGG!!!",
  },
];

const FAQItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.questionContainer}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.questionText}>{item.question}</Text>
        <Ionicons
          name={expanded ? "chevron-forward" : "chevron-down"}
          size={24}
          color={colors.darkBlue}
        />
      </TouchableOpacity>
      {expanded && <Text style={styles.answerText}>{item.answer}</Text>}
    </View>
  );
};

export default function FAQ() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        height: "100%",
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("../../assets/images/gradient-bg.png")}
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
            <Text style={styles.navbarText}>FAQ</Text>
          </View>
        </View>
      </ImageBackground>
      <ScrollView style={{ paddingTop: 10, paddingHorizontal: 20 }}>
        {faqData.map((item) => (
          <FAQItem item={item} key={item.answer} />
        ))}
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
