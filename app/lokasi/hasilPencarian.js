import {
  View,
  Text,
  Image,
  TextInput,
  Modal,
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

export default function HasilPencarian() {
  const router = useRouter();
  const { results, filters } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const lokasi = JSON.parse(results);
  const filter = JSON.parse(filters);

  console.log("ini", lokasi.resultsWithKuota);

  return (
    <SafeAreaView
      style={{
        height: "100%",
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("../../assets/images/gradient-bg.png")}
        style={styles.navbar}
      >
        <View style={{ flexDirection: "row" }}>
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
              marginBottom: 10,
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
                  Pilih Kuota
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
        <Text>Results without Quota</Text>
        {lokasi.resultsWithoutKuota.map((item, index) => (
          <View
            key={index}
            style={{
              padding: 10,
              borderBottomWidth: 1,
              backgroundColor: "#ccc",
            }}
          >
            <Text>{item.lokasi.nama}</Text>
          </View>
        ))}
      </ScrollView>
      <Button title="Readjust Filters" onPress={() => setModalVisible(true)} />
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
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
            }}
          >
            {/* Filter adjustment form goes here */}
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
