import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { colors } from "./../theme";
import { Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Chatbot() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Halo, saya siap menjawab pertanyaanmu.",
      isBot: true,
    },
    {
      id: "2",
      text: "Silakan pilih topik yang ingin ditanyakan atau ketik pertanyaan",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [quickReplies, setQuickReplies] = useState([
    "Saya ingin mengganti paspor hilang",
    "Saya ingin mengganti paspor rusak",
    "Saya ingin mengganti paspor rusak paspor yang sudah tidak berlaku",
  ]);

  const handleSend = () => {
    if (input.trim() !== "") {
      const userMessage = {
        id: (messages.length + 1).toString(),
        text: input,
        isBot: false,
      };
      setMessages([...messages, userMessage]);
      setInput("");

      respondToMessage(input);
    }
  };

  const handleQuickReply = (reply) => {
    const userMessage = {
      id: (messages.length + 1).toString(),
      text: reply,
      isBot: false,
    };
    setMessages([...messages, userMessage]);

    respondToMessage(reply);
  };

  const respondToMessage = (message) => {
    let botResponses = [];
    let newQuickReplies = [];

    switch (message.trim().toLowerCase()) {
      case "saya ingin mengganti paspor hilang":
        botResponses = [
          "Saat ini pelayanan penggantian paspor hilang belum bisa dilakukan melalui aplikasi M-Paspor",
          "Silakan datang ke Kantor Imigrasi terdekat untuk melaksanakan pemerriksaan pada Bidang/Seksi Intelijen dan Penindakan Keimigrasian",
        ];
        newQuickReplies = ["Persyaratan penggantian paspor hilang"];
        break;
      case "persyaratan penggantian paspor hilang":
        botResponses = [
          "e-KTP atau Surat Keterangan Perekaman e-KTP\n• kartu keluarga\n• akta kelahiran, akta perkawinan atau buku nikah, ijazah, atau surat baptis\n• Surat Lapor Kehilangan dari Kepolisian\n• fotokopi paspor lama (bila ada)",
        ];
        newQuickReplies = [];
        break;

      default:
        botResponses = ["Silakan ketik ulang pertanyaan."];
        newQuickReplies = [
          "Saya ingin mengganti paspor hilang",
          "Saya ingin mengganti paspor rusak",
          "Saya ingin mengganti paspor rusak paspor yang sudah tidak berlaku",
        ];
    }

    const botMessages = botResponses.map((response, index) => ({
      id: (messages.length + 2 + index).toString(),
      text: response,
      isBot: true,
    }));

    setMessages((prevMessages) => [...prevMessages, ...botMessages]);
    setQuickReplies(newQuickReplies);
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.isBot ? styles.botMessage : styles.userMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
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
              <Text style={styles.navbarText}>Konsultasi Virtual</Text>
            </View>
          </View>
        </ImageBackground>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <FlatList
              data={messages}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.messagesContainer}
              style={styles.messagesList}
            />
            {quickReplies.length > 0 && (
              <View style={styles.quickRepliesContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {quickReplies.map((reply, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.quickReplyButton}
                      onPress={() => handleQuickReply(reply)}
                    >
                      <Text style={styles.quickReplyText}>{reply}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Type a message..."
                onSubmitEditing={handleSend}
                returnKeyType="send"
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    fontSize: 20,
    marginLeft: 10,
    fontFamily: "FiraSansMedium",
  },
  safeArea: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inner: {
    flex: 1,
    justifyContent: "flex-end",
  },
  messagesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  messagesList: {
    flex: 1,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 14,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E8F7F5",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#EEF0F0",
  },
  messageText: {
    color: "black",
    fontFamily: "FiraSansRegular",
  },
  quickRepliesContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  quickReplyButton: {
    backgroundColor: "white",
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  quickReplyText: {
    color: "black",
    fontWeight: "bold",
    fontFamily: "FiraSansMedium",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
  },
  input: {
    // flex: 1,
    // padding: 10,
    // borderRadius: 5,
    // borderWidth: 1,
    // borderColor: "#ddd",
    marginRight: 10,
    height: 48,
    borderColor: colors.grey,
    borderWidth: 1,
    // marginTop: 16,
    paddingHorizontal: 8,
    // width: "100%",
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  sendButton: {
    backgroundColor: colors.darkBlue,
    paddingHorizontal: 20,
    height: 48,
    borderRadius: 10,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "FiraSansMedium",
    margin: "auto",
  },
});
