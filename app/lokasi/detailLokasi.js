import { View, Text, Image, TextInput } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { colors } from "./../theme";
import { Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function DetailLokasi() {
  const router = useRouter();
  const { lokasi } = useLocalSearchParams();
  const detailLokasi = JSON.parse(lokasi);

  console.log(detailLokasi);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        height: "100%",
        flex: 1,
      }}
    >
      <Image
        source={require("../../assets/images/lokasi-map.png")}
        style={{
          // marginHorizontal: 10,
          height: "70%",
        }}
      />
      <View
        style={{ padding: 8, paddingTop: 30, flexDirection: "row", gap: 10 }}
      >
        <Ionicons
          name="chevron-back"
          color={colors.darkBlue}
          size={26}
          onPress={() => router.back()}
        />
        <View style={{ width: "80%" }}>
          <Text
            style={{
              fontSize: 20,
              color: colors.darkBlue,
              fontFamily: "FiraSansMedium",
              marginBottom: 4,
            }}
          >
            {detailLokasi.lokasi.nama}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.inactive,
              fontFamily: "FiraSansRegular",
              marginBottom: 8,
            }}
          >
            {detailLokasi.lokasi.alamat}
          </Text>
          {/* <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text
              style={{
                fontSize: 15,
                color: "black",
                fontFamily: "FiraSansRegular",
              }}
            >
              Kuota permohonan reguler :
            </Text>
            <View
              style={{
                backgroundColor: colors.darkGreen,
                borderRadius: "15",
                // justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                width: 30, // Equal width and height
                height: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  fontFamily: "FiraSansRegular",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                {detailLokasi.totalKuota}
              </Text>
            </View>
          </View> */}
          <View style={{ marginBottom: 10, flexDirection: "row", gap: 10 }}>
            <View
              style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
            >
              <Ionicons
                name={
                  detailLokasi.lokasi.isBiasa
                    ? "checkmark-circle"
                    : "close-circle"
                }
                size={24}
                color={detailLokasi.lokasi.isBiasa ? "green" : "red"}
              />
              <Text style={{ fontFamily: "FiraSansRegular", color: "black" }}>
                Biasa
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
            >
              <Ionicons
                name={
                  detailLokasi.lokasi.isElektronik
                    ? "checkmark-circle"
                    : "close-circle"
                }
                size={24}
                color={detailLokasi.lokasi.isElektronik ? "green" : "red"}
              />
              <Text style={{ fontFamily: "FiraSansRegular", color: "black" }}>
                Elektronik
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
            >
              <Ionicons
                name={
                  detailLokasi.lokasi.isPolikarbonat
                    ? "checkmark-circle"
                    : "close-circle"
                }
                size={24}
                color={detailLokasi.lokasi.isPolikarbonat ? "green" : "red"}
              />
              <Text style={{ fontFamily: "FiraSansRegular", color: "black" }}>
                Polikarbonat
              </Text>
            </View>
          </View>
          <Button
            onPress={() =>
              router.push({
                pathname: "/lokasi/pilihJadwal",
                params: {
                  lokasi: JSON.stringify(item),
                  jenisPermohonan: filter.jenisPermohonan,
                },
              })
            }
            style={{
              width: "100%",
              backgroundColor: colors.darkBlue,
              height: 48,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "FiraSansMedium",
              }}
            >
              Pilih Kantor
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
