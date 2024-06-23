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
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Beranda() {
  const [jenisPermohonan, setJenisPermohonan] = useState("");
  const [kota, setKota] = useState("");
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");
  const [isTanggalAwalPickerVisible, setTanggalAwalVisible] = useState(false);
  const [isTanggalAkhirPickerVisible, setTanggalAkhirVisible] = useState(false);

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

  const handleCariKuota = () => {
    console.log(jenisPermohonan, kota, tanggalAwal, tanggalAkhir);
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
          <View style={styles.overlayContainer}>
            <Text style={styles.headerText}>Beranda</Text>
            <View style={styles.contentContainer}>
              <View style={{ marginBottom: 10 }}>
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
                <Radio.Group
                  name="myRadioGroup"
                  value={jenisPermohonan}
                  onChange={(e) => setJenisPermohonan(e)}
                  style={{ flexDirection: "row" }}
                >
                  <Radio value="Reguler" my="1" size="sm">
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
                  <Radio value="Percepatan" my="1" ml="3" size="sm">
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
