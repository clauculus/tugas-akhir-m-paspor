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

      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Text>Results with Quota</Text>
        {lokasi.resultsWithKuota.map((item, index) => (
          <View
            key={index}
            style={{
              padding: 10,
              borderBottomWidth: 1,
              backgroundColor: "pink",
              borderRadius: 18,
            }}
          >
            <Text>{item.lokasi.nama}</Text>
            <Text>{item.lokasi.nama}</Text>
            <Text>Kuota permohonan reguler : {item.totalKuota}</Text>
            <Text>{item.lokasi.isBiasa ? "biasa" : "ga biasa"}</Text>
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
            >
              Pilih Kuota
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
            >
              Lihat Detail
            </Button>
            {/* <Button title="Choose" onPress={() => navigation.push('CalendarPage', { location: item.location })} />
            <Button title="See Detail" onPress={() => navigation.push('DetailPage', { location: item.location })} /> */}
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
