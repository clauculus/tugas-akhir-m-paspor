import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { colors } from "./../theme";
import { Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Portal } from "react-native-paper";

export default function HasilPencarian() {
  const router = useRouter();
  const { results, filters } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const lokasi = JSON.parse(results);
  const filter = JSON.parse(filters);

  const [namaKantor, setNamaKantor] = useState("");
  const [visible, setVisible] = useState(false);
  const showModal = (item) => {
    setNamaKantor(item.lokasi.nama);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 35,
    width: "85%",
    margin: "auto",
    borderRadius: 18,
  };

  console.log("ini", lokasi.resultsWithKuota);

  return (
    <SafeAreaView
      style={{
        height: "100%",
        flex: 1,
      }}
      edges={["right", "left", "top"]}
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
            <Text style={styles.navbarText}>{filter.kota}</Text>
            <Text style={styles.navbarText}>
              Permohonan {filter.jenisPermohonan}
            </Text>
            <Text style={styles.navbarText}>{filter.startDate}</Text>
          </View>
        </View>
      </ImageBackground>
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
              Kuota pembukaan paspor untuk bulan Juli akan dibuka pada{" "}
              <Text style={{ fontFamily: "FiraSansSemiBold" }}>
                Senin, 3 Juni 2024
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
      <ScrollView style={{ flex: 1, padding: 24 }}>
        {/* <Text>Results with Quota</Text> */}
        {lokasi.resultsWithKuota.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.25,
              shadowRadius: 6,
              elevation: 1,
              borderRadius: 18,
              padding: 23,
              borderWidth: 0.5,
              borderColor: "#6FA39A",
              gap: 2,
              marginBottom: 24,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: colors.darkBlue,
                fontFamily: "FiraSansMedium",
                marginBottom: 4,
              }}
            >
              {item.lokasi.nama}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.inactive,
                fontFamily: "FiraSansRegular",
                marginBottom: 8,
              }}
            >
              {item.lokasi.alamat}
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
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
                  {item.totalKuota}
                </Text>
              </View>
            </View>
            <View style={{ marginBottom: 10, flexDirection: "row", gap: 10 }}>
              <View
                style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
              >
                <Ionicons
                  name={
                    item.lokasi.isBiasa ? "checkmark-circle" : "close-circle"
                  }
                  size={24}
                  color={item.lokasi.isBiasa ? "green" : "red"}
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
                    item.lokasi.isElektronik
                      ? "checkmark-circle"
                      : "close-circle"
                  }
                  size={24}
                  color={item.lokasi.isElektronik ? "green" : "red"}
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
                    item.lokasi.isPolikarbonat
                      ? "checkmark-circle"
                      : "close-circle"
                  }
                  size={24}
                  color={item.lokasi.isPolikarbonat ? "green" : "red"}
                />
                <Text style={{ fontFamily: "FiraSansRegular", color: "black" }}>
                  Polikarbonat
                </Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
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
                  width: "48%",
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

              <Button
                onPress={() =>
                  router.push({
                    pathname: "/lokasi/detailLokasi",
                    params: {
                      lokasi: JSON.stringify(item),
                    },
                  })
                }
                style={{
                  width: "48%",
                  backgroundColor: colors.white,
                  height: 48,
                  borderRadius: 12,
                  borderWidth: 1.5,
                }}
              >
                <Text
                  style={{
                    color: colors.darkBlue,
                    fontSize: 16,
                    fontFamily: "FiraSansMedium",
                  }}
                >
                  Lihat Detail
                </Text>
              </Button>
            </View>
          </View>
        ))}
        {/* <Text>Results without Quota</Text> */}
        {lokasi.resultsWithoutKuota.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.25,
              shadowRadius: 6,
              elevation: 1,
              borderRadius: 18,
              padding: 23,
              borderWidth: 0.5,
              borderColor: "#6FA39A",
              gap: 2,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: colors.inactive,
                padding: 10,
                paddingVertical: 5,
                width: 110,
                borderRadius: 20,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  fontFamily: "FiraSansRegular",
                  margin: "auto",
                }}
              >
                Kuota habis
              </Text>
            </View>
            <Text
              style={{
                fontSize: 20,
                color: colors.inactiveGrey,
                fontFamily: "FiraSansMedium",
                marginBottom: 4,
              }}
            >
              {item.lokasi.nama}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.inactiveGrey,
                fontFamily: "FiraSansRegular",
                marginBottom: 8,
              }}
            >
              {item.lokasi.alamat}
            </Text>

            <View style={{ marginBottom: 10, flexDirection: "row", gap: 10 }}>
              <View
                style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
              >
                <Ionicons
                  name={
                    item.lokasi.isBiasa ? "checkmark-circle" : "close-circle"
                  }
                  size={24}
                  color={colors.inactiveGrey}
                />
                <Text
                  style={{
                    fontFamily: "FiraSansRegular",
                    color: colors.inactiveGrey,
                  }}
                >
                  Biasa
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
              >
                <Ionicons
                  name={
                    item.lokasi.isElektronik
                      ? "checkmark-circle"
                      : "close-circle"
                  }
                  size={24}
                  color={colors.inactiveGrey}
                />
                <Text
                  style={{
                    fontFamily: "FiraSansRegular",
                    color: colors.inactiveGrey,
                  }}
                >
                  Elektronik
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
              >
                <Ionicons
                  name={
                    item.lokasi.isPolikarbonat
                      ? "checkmark-circle"
                      : "close-circle"
                  }
                  size={24}
                  color={colors.inactiveGrey}
                />
                <Text
                  style={{
                    fontFamily: "FiraSansRegular",
                    color: colors.inactiveGrey,
                  }}
                >
                  Polikarbonat
                </Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button
                onPress={() => showModal(item)}
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

              <Button
                onPress={() =>
                  router.push({
                    pathname: "/lokasi/detailLokasi",
                    params: {
                      lokasi: JSON.stringify(item),
                    },
                  })
                }
                style={{
                  // width: "48%",
                  backgroundColor: colors.white,
                  height: 48,
                  borderRadius: 12,
                  borderWidth: 1.5,
                  borderColor: colors.darkGreen,
                }}
              >
                <Text
                  style={{
                    color: colors.darkGreen,
                    fontSize: 16,
                    fontFamily: "FiraSansMedium",
                  }}
                >
                  Lihat Detail
                </Text>
              </Button>
            </View>
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          // paddingBottom: 36,
          shadowColor: "#000",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.25,
          shadowRadius: 6,
          elevation: 1,
          // backgroundColor: "pink",
        }}
      >
        <Button
          title="Readjust Filters"
          onPress={() => setModalVisible(true)}
          style={{
            // height: "100%",
            shadowOpacity: 0,
            backgroundColor: "white",
            margin: "auto",
            marginBottom: 30,
            paddingTop: 15,
            width: "50%",
            borderRadius: 0,
            borderRightWidth: 1,
            borderRightColor: "#BBBBBB",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "FiraSansMedium",
              color: colors.darkBlue,
            }}
          >
            URUTKAN
          </Text>
        </Button>
        <Button
          title="Readjust Filters"
          onPress={() => setModalVisible(true)}
          style={{
            marginBottom: 30,
            backgroundColor: "white",
            paddingTop: 15,
            margin: "auto",
            width: "50%",
            borderRadius: 0,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "FiraSansMedium",
              color: colors.darkBlue,
            }}
          >
            UBAH FILTER
          </Text>
        </Button>
      </View>
      <Modal visible={modalVisible} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "pink",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text>UBAH FILTER</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
    fontSize: 16,
    marginLeft: 10,
  },
});
