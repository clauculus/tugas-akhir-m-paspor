import { View, Text, Image, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { colors } from "./../theme";
import { Button } from "native-base";

export default function OnboardingScreen1() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        height: "100%",
        alignItems: "center",
        flex: 1,
        paddingVertical: 50,
        paddingHorizontal: 50,
        rowGap: 20,
      }}
    >
      <Image
        source={require("../../assets/images/imigrasi-logo.png")}
        style={{
          width: 50,
          height: 50,
          alignContent: "center",
        }}
      />
      <Text
        style={{
          color: colors.darkBlue,
          fontSize: 28,
          textAlign: "center",
          fontFamily: "FiraSansSemiBold",
        }}
      >
        Cari Kuota Permohonan Paspor
      </Text>
      <Image
        source={require("../../assets/images/ob1.png")}
        style={{
          width: 230,
          height: 291,
        }}
      />
      <Text
        style={{
          color: colors.inactive,
          fontSize: 15,
          fontFamily: "FiraSansRegular",
          marginBottom: 10,
        }}
      >
        Untuk melakukan permohonan paspor, silakan cari kuota antrian permohonan
        paspor terlebih dahulu
      </Text>
      <View>
        <Button
          style={{
            backgroundColor: colors.darkBlue,
            width: 200,
            borderRadius: 12,
            height: 48,
          }}
          onPress={() => router.push("/onboarding/screen2")}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontFamily: "FiraSansMedium",
            }}
          >
            Lanjut
          </Text>
        </Button>
        <Button
          onPress={() => router.push("home")}
          style={{ backgroundColor: colors.white, margin: 10 }}
        >
          <Text
            style={{
              color: colors.inactive,
              fontSize: 15,
              fontFamily: "FiraSansMedium",
            }}
          >
            Lewati
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
