import { useEffect, useState, useRef } from "react";
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

export default function OTPScreen() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const router = useRouter();

  const handleChange = (value, index) => {
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== "" && index < 3) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

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
                marginTop: 32,
              }}
            >
              Verifikasi OTP
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
          {/* <TabView
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderTabBar={renderCustomTabBar}
            renderScene={renderScene}
            style={styles.tabView}
          /> */}

          <Text
            style={{
              color: colors.darkBlue,
              fontSize: 16,
              fontFamily: "FiraSansMedium",
              marginTop: 18,
            }}
          >
            Masukkan kode OTP yang dikirimkan
          </Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={otpRefs[index]}
                style={styles.otpInput}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                autoFocus={index === 0}
              />
            ))}
          </View>

          {/* <TextInput
            style={styles.input}
            placeholder="62XXXXXXXXXXX"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          /> */}

          <Button
            // onPress={handleLogin}
            style={{
              backgroundColor: colors.darkBlue,
              width: "100%",
              borderRadius: 12,
              height: 48,
            }}
            onPress={() => router.push("/onboarding")}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "FiraSansMedium",
              }}
            >
              Verifikasi
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
            Kembali
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
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    columnGap: 17,
  },
  otpInput: {
    // borderBottomWidth: 2,
    // borderBottomColor: "#00385F",
    backgroundColor: "red",
    fontSize: 24,
    textAlign: "center",
    width: "20%",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderColor: colors.grey,
    borderWidth: 1.5,
    // marginBottom: 4,
    // marginTop: 16,
    // paddingHorizontal: 8,
    // width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
