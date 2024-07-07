import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  LogBox,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme";
import React, { useState, useEffect } from "react";
import { Radio, Select, Button } from "native-base";
import { kotaPenyediaLayanan } from "../data/kota";
import { kanim } from "../data/kanim";
import { useRouter } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal, Portal } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function Beranda() {
  const router = useRouter();
  const [jenisPermohonan, setJenisPermohonan] = useState("");
  const [kota, setKota] = useState("");
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");
  const [isTanggalAwalPickerVisible, setTanggalAwalVisible] = useState(false);
  const [isTanggalAkhirPickerVisible, setTanggalAkhirVisible] = useState(false);

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
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

  const hideTanggalAwalPicker = () => {
    setTanggalAwalVisible(false);
  };

  const handleConfirmTanggalAwal = (date) => {
    if (date) {
      setTanggalAwal(date);
    }
    hideTanggalAwalPicker();
  };

  const hideTanggalAkhirPicker = () => {
    setTanggalAkhirVisible(false);
  };

  const handleConfirmTanggalAkhir = (date) => {
    if (date) {
      setTanggalAkhir(date);
    }
    hideTanggalAkhirPicker();
  };

  const formatDateIndonesian = (date) => {
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // const handleCariKuota = () => {
  //   console.log(jenisPermohonan, kota, tanggalAwal, tanggalAkhir);
  // };

  const filterLocations = (listLokasi, filters) => {
    const { jenisPermohonan, kota, tanggalAwal, tanggalAkhir } = filters;
    const resultsWithKuota = [];
    const resultsWithoutKuota = [];
    listLokasi.forEach((lokasi) => {
      if (kota && lokasi.kota !== kota) return;

      const monthData = lokasi[jenisPermohonan];

      if (!monthData || monthData.length === 0) return;

      let totalKuota = 0;

      if (tanggalAwal && tanggalAkhir) {
        console.log(tanggalAwal, tanggalAkhir);
        const startMonth = tanggalAwal.getMonth() + 1;
        const startDay = tanggalAwal.getDate();
        const endMonth = tanggalAkhir.getMonth() + 1;
        const endDay = tanggalAkhir.getDate();

        console.log("startMonth", startMonth);
        console.log("startDay", startDay);
        console.log("endMonth", endMonth);
        console.log("endDay", endDay);

        monthData.forEach((monthObj) => {
          const monthKey = Object.keys(monthObj)[0];
          const monthInt = parseInt(monthKey, 10);
          console.log("monthKey", monthKey);
          console.log("monthInt", monthInt);

          if (monthInt >= startMonth && monthInt <= endMonth) {
            monthObj[monthKey].forEach((dayObj) => {
              const dayKey = parseInt(Object.keys(dayObj)[0], 10);

              if (
                (monthInt === startMonth &&
                  dayKey >= startDay &&
                  dayKey <= endDay) ||
                (monthInt === endMonth &&
                  dayKey >= startDay &&
                  dayKey <= endDay) ||
                (monthInt > startMonth && monthInt < endMonth)
              ) {
                console.log(
                  "kuota ditambah pada",
                  dayKey,
                  dayObj[dayKey].kuota
                );
                totalKuota += dayObj[dayKey].kuota;
              }
            });
          }
        });
      } else {
        monthData.forEach((monthObj) => {
          const monthKey = Object.keys(monthObj)[0];
          monthObj[monthKey].forEach((dayObj) => {
            totalKuota += dayObj[Object.keys(dayObj)[0]].kuota;
          });
        });
      }
      if (totalKuota > 0) {
        resultsWithKuota.push({ lokasi, totalKuota });
      } else {
        resultsWithoutKuota.push({ lokasi, totalKuota });
      }
    });

    return { resultsWithKuota, resultsWithoutKuota };
  };

  const handleCariKuota = () => {
    const filters = {
      jenisPermohonan,
      kota,
      tanggalAwal,
      tanggalAkhir,
    };
    const results = filterLocations(kanim, filters);
    console.log(JSON.stringify(results));

    router.push({
      pathname: "/lokasi/hasilPencarian",
      params: {
        results: JSON.stringify(results),
        filters: JSON.stringify(filters),
      },
    });
  };

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem("drafts");

      console.log("done");
      // Alert.alert("Success", "All data has been cleared from AsyncStorage!");
    } catch (error) {
      // Alert.alert("Error", "Failed to clear AsyncStorage!");
      console.error("Failed to clear AsyncStorage:", error);
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <SafeAreaView edges={["right", "left", "top"]} style={styles.container}>
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require("../../assets/images/cover-home.png")}
          style={styles.imageBackground}
        >
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
                  textAlign: "center",
                  color: colors.darkBlue,
                  marginBottom: 20,
                }}
              >
                Jenis Permohonan
              </Text>
              <View>
                <Text style={{ fontFamily: "FiraSansMedium", fontSize: 18 }}>
                  Permohonan Percepatan
                </Text>
                <Text
                  style={{
                    fontFamily: "FiraSansRegular",
                    fontSize: 15,
                    color: colors.inactive,
                    marginTop: 8,
                    marginBottom: 15,
                  }}
                >
                  • Proses pengerjaan{" "}
                  <Text style={{ fontFamily: "FiraSansMedium" }}>4 hari</Text>
                  {"\n"}• Pemohon cukup membayar biaya paspor
                </Text>
              </View>
              <View>
                <Text style={{ fontFamily: "FiraSansMedium", fontSize: 18 }}>
                  Permohonan Reguler
                </Text>
                <Text
                  style={{
                    fontFamily: "FiraSansRegular",
                    fontSize: 15,
                    color: colors.inactive,
                    marginTop: 8,
                    marginBottom: 15,
                  }}
                >
                  • Proses pengerjaan{" "}
                  <Text style={{ fontFamily: "FiraSansMedium" }}>1-2 jam</Text>
                  {"\n"}• Pemohon dikenakan biaya tambahan Rp1.000.000 di luar
                  biaya paspor paspor
                </Text>
              </View>
            </Modal>
          </Portal>
          <View style={styles.overlayContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.headerText}>Beranda</Text>
              <Ionicons
                name="notifications"
                size={30}
                color={"white"}
                onPress={() => {
                  router.push("/notification");
                }}
              />
            </View>
            <View style={styles.contentContainer}>
              <View
                style={{
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "FiraSansMedium",
                      fontSize: 17,
                      color: colors.darkBlue,
                    }}
                  >
                    Jenis Permohonan
                    <Text style={{ color: "red" }}> *</Text>
                  </Text>
                  <Ionicons
                    name="information-circle"
                    size={22}
                    color={"#9B9A9A"}
                    onPress={showModal}
                  />
                </View>
                <Radio.Group
                  name="myRadioGroup"
                  value={jenisPermohonan}
                  onChange={(e) => setJenisPermohonan(e)}
                  style={{ flexDirection: "row" }}
                >
                  <Radio value="reguler" my="1" size="sm">
                    <Text
                      style={{
                        fontFamily: "FiraSansRegular",
                        fontSize: 15,
                        color: colors.darkBlue,
                      }}
                    >
                      Reguler
                    </Text>
                  </Radio>
                  <Radio value="percepatan" my="1" ml="3" size="sm">
                    <Text
                      style={{
                        fontFamily: "FiraSansRegular",
                        fontSize: 15,
                        color: colors.darkBlue,
                      }}
                    >
                      Percepatan
                    </Text>
                  </Radio>
                </Radio.Group>
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontFamily: "FiraSansMedium",
                    fontSize: 16,
                    color: colors.darkBlue,
                    marginBottom: 5,
                  }}
                >
                  Kota Penyedia Layanan
                </Text>
                <Select
                  placeholder="Pilih kota"
                  selectedValue={kota}
                  width="full"
                  fontSize={15}
                  paddingHorizontal={10}
                  height={50}
                  borderRadius={10}
                  onValueChange={(e) => setKota(e)}
                >
                  {kotaPenyediaLayanan.map((city) => (
                    <Select.Item
                      key={city.value}
                      label={city.label}
                      value={city.value}
                    />
                  ))}
                </Select>
              </View>
              <View
                style={{ flexDirection: "row", gap: "10%", marginBottom: 18 }}
              >
                <View style={{ width: "48%" }}>
                  <Text
                    style={{
                      fontFamily: "FiraSansMedium",
                      fontSize: 16,
                      color: colors.darkBlue,
                      marginBottom: 5,
                    }}
                  >
                    Dari Tanggal
                  </Text>
                  <View style={{ marginBottom: 10 }}>
                    <TouchableOpacity
                      title="Pilih tanggal"
                      onPress={() => setTanggalAwalVisible(true)}
                      style={{
                        height: 48,
                        borderColor: colors.grey,
                        borderWidth: 1,
                        width: "100%",
                        borderRadius: 10,
                        backgroundColor: "#fff",
                        textAlign: "left",
                        justifyContent: "center",
                        paddingLeft: 13,
                      }}
                    >
                      <Text
                        style={{
                          color: "gray",
                          fontSize: 15,
                          textAlign: "left",
                        }}
                      >
                        {tanggalAwal
                          ? formatDateIndonesian(tanggalAwal)
                          : "Pilih tanggal"}
                      </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={isTanggalAwalPickerVisible}
                      mode="date"
                      onConfirm={handleConfirmTanggalAwal}
                      onCancel={hideTanggalAwalPicker}
                    />
                  </View>
                </View>
                <View style={{ width: "48%" }}>
                  <Text
                    style={{
                      fontFamily: "FiraSansMedium",
                      fontSize: 16,
                      color: colors.darkBlue,
                      marginBottom: 5,
                    }}
                  >
                    Sampai Tanggal
                  </Text>
                  <View style={{ marginBottom: 10 }}>
                    <TouchableOpacity
                      title="Pilih tanggal"
                      onPress={() => setTanggalAkhirVisible(true)}
                      style={{
                        height: 48,
                        borderColor: colors.grey,
                        borderWidth: 1,
                        width: "100%",
                        borderRadius: 10,
                        backgroundColor: "#fff",
                        textAlign: "left",
                        justifyContent: "center",
                        paddingLeft: 13,
                      }}
                    >
                      <Text
                        style={{
                          color: "gray",
                          fontSize: 15,
                          textAlign: "left",
                        }}
                      >
                        {tanggalAkhir
                          ? formatDateIndonesian(tanggalAkhir)
                          : "Pilih tanggal"}
                      </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={isTanggalAkhirPickerVisible}
                      mode="date"
                      onConfirm={handleConfirmTanggalAkhir}
                      onCancel={hideTanggalAkhirPicker}
                    />
                  </View>
                </View>
              </View>
              <Button
                // onPress={handleLogin}
                style={{
                  backgroundColor: colors.darkBlue,
                  width: "100%",
                  height: 48,
                  borderRadius: 12,
                }}
                onPress={handleCariKuota}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontFamily: "FiraSansMedium",
                  }}
                >
                  Cari Kuota Permohonan Paspor
                </Text>
              </Button>
            </View>
          </View>
        </ImageBackground>
        <View>
          <Text
            style={{
              fontFamily: "FiraSansMedium",
              fontSize: 20,
              marginLeft: 36,
            }}
          >
            Berita Imigrasi
          </Text>

          <ScrollView
            horizontal={true}
            style={styles.horizontalScrollContainer}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.horizontalScrollContent}>
              <View style={styles.card}>
                <Image
                  source={require("../../assets/images/berita-1.png")}
                  style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>
                    Paspor Biasa vs Paspor Elektronik
                  </Text>
                  <Text style={styles.cardDescription}>
                    Cari tahu perbedaan paspor biasa dan elektronik!
                  </Text>
                </View>
              </View>
              <View style={styles.card}>
                <Image
                  source={require("../../assets/images/berita-2.png")}
                  style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>
                    Pelayanan e-Paspor Ditambah!
                  </Text>
                  <Text style={styles.cardDescription}>
                    102 kantor di Indonesia melayani paspor elektronik
                  </Text>
                </View>
              </View>
              <View style={styles.card}>
                <Image
                  source={require("../../assets/images/berita-3.png")}
                  style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>
                    Ikuti Media Sosial Ditjen Imigrasi
                  </Text>
                  <Text style={styles.cardDescription}>
                    Dapatkan informasi terkini mengenai Paspor, Visa, ...
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        {/* <Button title="Clear AsyncStorage" onPress={clearAsyncStorage} /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageBackground: {
    height: 270,
    resizeMode: "cover",
    backgroundColor: "white",

    marginBottom: 200,
  },
  overlayContainer: {
    margin: "auto",
    width: "85%",
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  headerText: {
    color: "white",
    fontSize: 28,
    fontFamily: "FiraSansMedium",
  },
  contentContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginHorizontal: "auto",
    marginTop: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  horizontalScrollContainer: {
    paddingLeft: "7.5%",
    paddingRight: 20,
  },
  horizontalScrollContent: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginVertical: 20,
  },
  scrollItem: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
  },
  card: {
    width: 311,
    height: "auto",
    borderRadius: 10,
    backgroundColor: "white",
    overflowTop: "hidden",
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "FiraSansMedium",
  },
  cardDescription: {
    fontSize: 12,
    color: "gray",
    fontFamily: "FiraSansRegular",
  },
  dateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  selectedDate: {
    fontSize: 16,
    marginTop: 20,
  },
});
