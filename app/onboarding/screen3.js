import { View, Text, Image, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { colors } from "./../theme";
import { Button } from "native-base";

export default function OnboardingScreen3() {
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
        paddingHorizontal: 40,
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
        Lakukan Pembayaran
      </Text>
      <Image
        source={require("../../assets/images/ob3.png")}
        style={{ marginBottom: 20, width: 240, height: 240 }}
      />
      <Text
        style={{
          color: colors.inactive,
          fontSize: 15,
          fontFamily: "FiraSansRegular",
          width: "100%",
        }}
      >
        Lakukan pembayaran agar kamu mendapatkan kuota permohonan paspor.
      </Text>
      <Text
        style={{
          color: colors.inactive,
          fontSize: 15,
          fontFamily: "FiraSansRegular",
          marginBottom: 40,
          width: "100%",
        }}
      >
        Setelah itu, kamu bisa datang ke kantor imigrasi sesuai tanggal
        penjadwalan!
      </Text>

      <View>
        <Button
          style={{
            backgroundColor: colors.darkBlue,
            width: 200,
            borderRadius: 12,
            height: 48,
          }}
          onPress={() => router.push("/home")}
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
      </View>
    </SafeAreaView>
  );
}
