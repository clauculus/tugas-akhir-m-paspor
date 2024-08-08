import { View, Text, Image, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { colors } from "./../theme";
import { Button } from "native-base";

export default function OnboardingScreen2() {
  const router = useRouter();
  const [data, setData] = useState("");

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        height: "100%",
        alignItems: "center",
        flex: 1,
        paddingVertical: 50,
        paddingHorizontal: 50,
        // rowGap: 20,
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
        Persiapkan Dokumen Persyaratan
      </Text>
      <Image
        source={require("../../assets/images/ob2.png")}
        style={{ width: 240, height: 251, marginBottom: 20 }}
      />
      <Text
        style={{
          color: colors.inactive,
          fontSize: 15,
          fontFamily: "FiraSansRegular",
          width: "100%",
        }}
      >
        Persiapkan dokumen di bawah untuk mempermudah pengisian formulir
      </Text>
      <Text
        style={{
          color: colors.inactive,
          fontSize: 15,
          fontFamily: "FiraSansRegular",
          width: "100%",
          marginBottom: 30,
        }}
      >
        {"\u2022"} Kartu Tanda Penduduk{"\n"}
        {"\u2022"} Kartu Keluarga{"\n"}
        {"\u2022"} Akta Kelahiran/Akta Perkawinan/Buku Nikah/Ijazah/Surat Baptis
        {"\n"}
        {"\u2022"} Paspor Lama (jika ada)
      </Text>

      <View>
        <Button
          style={{
            backgroundColor: colors.darkBlue,
            width: 200,
            borderRadius: 12,
            height: 48,
          }}
          onPress={() => router.push("/onboarding/screen3")}
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
