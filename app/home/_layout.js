import { Tabs } from "expo-router";
import { colors } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

const ChatbotIcon = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.chatbotButton}
      onPress={() => router.push("/bantuan/chatbot")}
    >
      <Ionicons name="chatbubbles" size={30} color={colors.darkBlue} />
    </TouchableOpacity>
  );
};

export default function HomeLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.white,
          tabBarInactiveTintColor: colors.inactive,
          tabBarStyle: {
            backgroundColor: colors.darkBlue,
            paddingHorizontal: 10,
            paddingBottom: 24,
            height: 90,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: "FiraSansRegular",
          },
          tabBarIconStyle: {
            marginTop: 5,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="beranda"
          options={{
            title: "Beranda",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="permohonan"
          options={{
            title: "Permohonan",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="document" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="bantuan"
          options={{
            title: "Bantuan",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="help-circle" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="profil"
          options={{
            title: "Profil",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
      <ChatbotIcon />
    </View>
  );
}

const styles = StyleSheet.create({
  chatbotButton: {
    position: "absolute",
    bottom: 120,
    right: 30,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
});
