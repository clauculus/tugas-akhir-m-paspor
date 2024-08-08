import { View, Text, Image, TextInput } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { colors } from "./../theme";
import { Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Portal } from "react-native-paper";

export default function DetailLokasi() {
  const router = useRouter();
  const { lokasi, jenisPermohonan, isPilihKantor } = useLocalSearchParams();
  const detailLokasi = JSON.parse(lokasi);
  const [namaKantor, setNamaKantor] = useState("");
  const [visible, setVisible] = useState(false);

  const containerStyle = {
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 35,
    width: "85%",
    margin: "auto",
    borderRadius: 18,
  };

  const showModal = (item) => {
    setNamaKantor(item.lokasi.nama);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

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
          {isPilihKantor == "true" ? (
            <Button
              onPress={() =>
                router.push({
                  pathname: "/lokasi/pilihJadwal",
                  params: {
                    lokasi: JSON.stringify(detailLokasi),
                    jenisPermohonan: jenisPermohonan,
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
          ) : (
            <Button
              onPress={() => showModal(detailLokasi)}
              style={{
                // width: "48%",
                backgroundColor: colors.darkGreen,
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
                Aktifkan Notifikasi
              </Text>
            </Button>
          )}
        </View>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Ionicons
              name="close"
              size={32}
              color="#D2D5D7"
              onPress={hideModal}
            />
          </View>
          <Text
            style={{
              fontFamily: "FiraSansMedium",
              fontSize: 20,
              // textAlign: "center",
              color: colors.darkBlue,
              marginBottom: 20,
            }}
          >
            Pembukaan Kuota di {namaKantor}
          </Text>
          <View>
            <Text style={{ fontFamily: "FiraSansRegular", fontSize: 16 }}>
              Kuota permohonan paspor selanjutnya akan ditambahkan pada{" "}
              <Text style={{ fontFamily: "FiraSansSemiBold" }}>
                Senin, 4 Agustus 2024 09.00 WIB
              </Text>
            </Text>
            <Button
              onPress={hideModal}
              style={{
                // width: "48%",
                backgroundColor: colors.darkBlue,
                height: 48,
                borderRadius: 12,
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontFamily: "FiraSansMedium",
                }}
              >
                Ingatkan saya
              </Text>
            </Button>
          </View>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}
