import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { colors } from "./../theme";
import { Radio, Select, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { kotaPenyediaLayanan } from "../data/kota";
import { kanim } from "../data/kanim";
import { Modal, Portal } from "react-native-paper";

const { height: screenHeight } = Dimensions.get("window");

const BottomModal = ({
  visible,
  onDismiss,
  jenisPermohonan,
  setJenisPermohonan,
  kota,
  setKota,
  tanggalAwal,
  setTanggalAwal,
  tanggalAkhir,
  setTanggalAkhir,
  onReset,
}) => {
  const [slideAnim] = useState(new Animated.Value(0));
  const [isTanggalAwalPickerVisible, setTanggalAwalVisible] = useState(false);
  const [isTanggalAkhirPickerVisible, setTanggalAkhirVisible] = useState(false);

  const formatDateIndonesian = (date) => {
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(() => onDismiss());
    }
  }, [visible]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [screenHeight * 0.3, 0], // Adjust the value to 30% of screen heig  });
  });
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <Animated.View
          style={[styles.modalContent, { transform: [{ translateY }] }]}
        >
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
                  // onPress={showModal}
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
                        ? formatDateIndonesian(new Date(tanggalAwal))
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
                        ? formatDateIndonesian(new Date(tanggalAkhir))
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
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button
              onPress={onReset}
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
                Reset
              </Text>
            </Button>
            <Button
              mode="contained"
              onPress={onDismiss}
              style={{
                backgroundColor: colors.darkBlue,
                width: "48%",
                height: 48,
                borderRadius: 12,
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontFamily: "FiraSansMedium",
                }}
              >
                Filter
              </Text>
            </Button>
          </View>
        </Animated.View>
      </Modal>
    </Portal>
  );
};

export default function HasilPencarian() {
  const router = useRouter();
  const { results, filters } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  // const lokasi = JSON.parse(results);
  // const filter = JSON.parse(filters);
  const [lokasi, setLokasi] = useState(JSON.parse(results));
  const [filter, setFilter] = useState(JSON.parse(filters));

  const [jenisPaspor, setJenisPaspor] = useState("biasa");
  const [jenisPermohonan, setJenisPermohonan] = useState(
    filter.jenisPermohonan
  );
  const [kota, setKota] = useState(filter.kota);
  const [tanggalAwal, setTanggalAwal] = useState(filter.tanggalAwal);
  const [tanggalAkhir, setTanggalAkhir] = useState(filter.tanggalAkhir);
  const [isTanggalAwalPickerVisible, setTanggalAwalVisible] = useState(false);
  const [isTanggalAkhirPickerVisible, setTanggalAkhirVisible] = useState(false);

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

  const containerUrutkan = {
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 35,
    width: "100%",
    margin: "auto",
    borderRadius: 18,
    bottom: 0,
  };

  const formatDateIndonesian = (date) => {
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // console.log("ini", lokasi.resultsWithKuota);
  // console.log("filter", filter);

  const filterLocations = (listLokasi, filters) => {
    let { jenisPermohonan, kota, tanggalAwal, tanggalAkhir } = filters;
    const resultsWithKuota = [];
    const resultsWithoutKuota = [];
    listLokasi.forEach((lokasi) => {
      if (kota && lokasi.kota !== kota) return;

      if (jenisPaspor === "biasa" && !lokasi.isBiasa) return;
      if (jenisPaspor === "elektronik" && !lokasi.isElektronik) return;
      if (jenisPaspor === "polikarbonat" && !lokasi.isPolikarbonat) return;

      const monthData = lokasi[jenisPermohonan];

      if (!monthData || monthData.length === 0) return;

      let totalKuota = 0;

      if (tanggalAwal && tanggalAkhir) {
        // console.log(tanggalAwal, tanggalAkhir);
        tanggalAwal = new Date(tanggalAwal);
        tanggalAkhir = new Date(tanggalAkhir);
        const startMonth = tanggalAwal.getMonth() + 1;
        const startDay = tanggalAwal.getDate();
        const endMonth = tanggalAkhir.getMonth() + 1;
        const endDay = tanggalAkhir.getDate();

        // console.log("startMonth", startMonth);
        // console.log("startDay", startDay);
        // console.log("endMonth", endMonth);
        // console.log("endDay", endDay);

        monthData.forEach((monthObj) => {
          const monthKey = Object.keys(monthObj)[0];
          const monthInt = parseInt(monthKey, 10);
          // console.log("monthKey", monthKey);
          // console.log("monthInt", monthInt);

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
                // console.log(
                //   "kuota ditambah pada",
                //   dayKey,
                //   dayObj[dayKey].kuota
                // );
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

  useEffect(() => {
    handleCariKuota();
  }, [jenisPaspor]);

  const handleReset = () => {
    setKota("");
    setTanggalAkhir("");
    setTanggalAwal("");
    handleCariKuota();
  };

  const handleCariKuota = () => {
    const filters = {
      jenisPermohonan,
      kota,
      tanggalAwal,
      tanggalAkhir,
    };
    const results = filterLocations(kanim, filters);
    setLokasi(results);
    setFilter(filters);
  };

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
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.navbarText}>
              Permohonan{" "}
              {filter.jenisPermohonan === "reguler" ? "Reguler" : "Percepatan"}
            </Text>
            {filter.kota && (
              <Text style={{ fontFamily: "FiraSansRegular", color: "white" }}>
                KOTA {filter.kota}
              </Text>
            )}
            {filter.tanggalAwal && filter.tanggalAkhir && (
              <Text style={{ fontFamily: "FiraSansRegular", color: "white" }}>
                {formatDateIndonesian(new Date(filter.tanggalAwal))} -{" "}
                {formatDateIndonesian(new Date(filter.tanggalAkhir))}
              </Text>
            )}
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
              Kuota permohonan paspor selanjutnya akan dibuka pada{" "}
              <Text style={{ fontFamily: "FiraSansSemiBold" }}>
                Senin, 4 Agustus 2024
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
      <View style={{ paddingTop: 24, paddingBottom: 8, paddingHorizontal: 24 }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "FiraSansMedium",
            color: colors.darkBlue,
          }}
        >
          Jenis Paspor
        </Text>
        <View>
          <Radio.Group
            name="myRadioGroup"
            value={jenisPaspor}
            onChange={(e) => setJenisPaspor(e)}
            style={{ flexDirection: "row" }}
          >
            <Radio value="biasa" my="1" size="sm">
              <Text
                style={{
                  fontFamily: "FiraSansRegular",
                  fontSize: 15,
                  color: colors.darkBlue,
                }}
              >
                Biasa
              </Text>
            </Radio>
            <Radio value="elektronik" my="1" ml="3" size="sm">
              <Text
                style={{
                  fontFamily: "FiraSansRegular",
                  fontSize: 15,
                  color: colors.darkBlue,
                }}
              >
                Elektronik
              </Text>
            </Radio>
            <Radio value="polikarbonat" my="1" ml="3" size="sm">
              <Text
                style={{
                  fontFamily: "FiraSansRegular",
                  fontSize: 15,
                  color: colors.darkBlue,
                }}
              >
                Polikarbonat
              </Text>
            </Radio>
          </Radio.Group>
        </View>
      </View>
      <ScrollView
        style={{
          flex: 1,
          paddingBottom: 24,
          paddingHorizontal: 24,
          paddingTop: 8,
        }}
      >
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
                      jenisPermohonan: filter.jenisPermohonan,
                      isPilihKantor: true,
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
                      jenisPermohonan: filter.jenisPermohonan,
                      isPilihKantor: false,
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
      {/* <BottomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      /> */}
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
        {/* <Button
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
        </Button> */}
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

      {/* <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={containerUrutkan}
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
      </Portal> */}

      {/* <Modal visible={modalVisible} transparent={true}>
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
            <Text style={{ color: colors.inactive }}>Urutkan</Text>
            <Text style={{ color: colors.inactive }}>Urutkan</Text>
            <Text style={{ color: colors.inactive }}>Urutkan</Text>
            <Text style={{ color: colors.inactive }}>Urutkan</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal> */}
      {/* <Modal
        transparent
        visible={modalVisible}
        animationType="none"
        onClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.overlay} onPress={onClose} />
          <Animated.View
            style={[styles.modalContainer, { transform: [{ translateY }] }]}
          >
            <Text style={styles.modalText}>This is a modal!</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal> */}
      <BottomModal
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);
          handleCariKuota();
        }}
        jenisPermohonan={jenisPermohonan}
        setJenisPermohonan={setJenisPermohonan}
        kota={kota}
        setKota={setKota}
        tanggalAwal={tanggalAwal}
        setTanggalAwal={setTanggalAwal}
        tanggalAkhir={tanggalAkhir}
        setTanggalAkhir={setTanggalAkhir}
        onReset={handleReset}
      />
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
    fontFamily: "FiraSansMedium",
    fontSize: 20,
    marginBottom: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    position: "absolute",
    bottom: -40,
    width: "100%",
    flex: 1,
  },
  modalContent: {
    // position: "absolute",
    // bottom: 0,
    backgroundColor: "white",
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    width: "100%",
    // height: screenHeight * 0.3, // Set the height to 30% of the screen height
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
  },
});
