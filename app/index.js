import { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Input } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { colors } from "./theme";
import { useRouter } from "expo-router";

const FirstRoute = ({ data, setData }) => {
  const [temporaryData, setTemporaryData] = useState(`${data}`);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TextInput
        style={styles.input}
        placeholder="62XXXXXXXXXXX"
        keyboardType="numeric"
        onChangeText={(val) => {
          setTemporaryData(val);
          console.log(val);
        }}
        onEndEditing={() => setData(temporaryData)}
        defaultValue={data}
      />
      <Text
        style={{
          color: colors.inactive,
          fontSize: 13,
          fontFamily: "FiraSansRegular",
          marginBottom: 18,
          marginLeft: 10,
        }}
      >
        Kode OTP akan dikirim ke nomor di atas
      </Text>
    </View>
  );
};

const SecondRoute = ({ data, setData }) => {
  const [temporaryData, setTemporaryData] = useState(`${data}`);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TextInput
        style={styles.input}
        placeholder="email@abc.com"
        keyboardType="email-address"
        onChangeText={(val) => {
          setTemporaryData(val);
          console.log(val);
        }}
        onEndEditing={() => setData(temporaryData)}
        defaultValue={data}
      />
      <Text
        style={{
          color: colors.inactive,
          fontSize: 13,
          fontFamily: "FiraSansRegular",
          marginBottom: 18,
          marginLeft: 10,
        }}
      >
        Kode OTP akan dikirim ke email di atas
      </Text>
    </View>
  );
};

const renderCustomTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.darkBlue }}
    style={{ backgroundColor: "white" }}
    labelStyle={{
      fontFamily: "FiraSansMedium",
      fontSize: 16,
      textTransform: "none",
      borderRadius: 10,
    }}
    activeColor={colors.darkBlue}
    inactiveColor="gray"
  />
);

export default function Index() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [routes] = useState([
    { key: "first", title: "Nomor Telepon" },
    { key: "second", title: "Email" },
  ]);

  const handleLogin = () => {
    console.log("Logging in with", phone);
  };

  const renderScene = SceneMap({
    first: () => <FirstRoute data={phone} setData={setPhone} />,
    second: () => <SecondRoute data={email} setData={setEmail} />,
  });

  return (
    <SafeAreaView
      style={
        {
          // backgroundColor: "#00385F",
        }
      }
    >
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/cover-login.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.overlay}>
            <View
              style={{
                flexDirection: "row",
                padding: 10,
              }}
            >
              <Image
                source={require("../assets/images/pengayoman-logo.png")}
                style={{
                  marginHorizontal: 10,
                }}
              />
              <Image
                source={require("../assets/images/imigrasi-logo.png")}
                style={{
                  marginHorizontal: 10,
                }}
              />
            </View>
            <Text
              style={{
                color: "white",
                fontSize: 28,
                textAlign: "center",
                fontFamily: "FiraSansSemiBold",
              }}
            >
              Selamat Datang di Aplikasi M-Paspor!
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.bottomContainer}>
          <Text
            style={{
              paddingTop: 24,
              textAlign: "center",
              color: "white",
              marginBottom: 44,
              fontFamily: "FiraSansRegular",
            }}
          >
            ©️ 2024 Direktorat Jenderal Imigrasi Republik Indonesia
          </Text>
        </View>
        <View style={styles.formContainer}>
          <TabView
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderTabBar={renderCustomTabBar}
            renderScene={renderScene}
            style={styles.tabView}
          />
          <Button
            // onPress={handleLogin}
            style={{
              backgroundColor: colors.darkBlue,
              width: "100%",
              height: 48,
              borderRadius: 12,
            }}
            onPress={() => router.push("/otp")}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "FiraSansMedium",
              }}
            >
              Kirim OTP
            </Text>
          </Button>
          <Text
            style={{
              color: colors.inactive,
              fontSize: 16,
              fontFamily: "FiraSansRegular",
              marginTop: 18,
            }}
          >
            Belum memiliki akun?{" "}
            <Text
              style={{ color: colors.darkBlue, fontFamily: "FiraSansMedium" }}
            >
              Daftar Akun
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabView: {
    backgroundColor: "white",
    width: "100%",
    height: 150,
  },
  backgroundImage: {
    height: height * 0.5,
    width: "100%",
  },
  overlay: {
    flex: 1,
    flexDirection: "column",
    height: "50%",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    padding: 30,
    alignItems: "center",
  },
  bottomContainer: {
    flexDirection: "column-reverse",
    height: height * 0.5,
    backgroundColor: "#00385F",
    paddingBottom: 60,
  },
  formContainer: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: 250 }], // Adjust this value as needed to center the form vertically
    width: "85%",
    alignSelf: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 48,
    borderColor: colors.grey,
    borderWidth: 1.5,
    marginBottom: 4,
    marginTop: 16,
    paddingHorizontal: 8,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
