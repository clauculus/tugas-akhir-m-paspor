import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { colors } from "./../theme";
import { Radio, Select, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressBar, MD3Colors } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Step1() {
  const router = useRouter();
  const [nama, setNama] = useState("Charlize");
  const [NIK, setNIK] = useState("43948394293");
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [tanggalDikeluarkanKTP, setTanggalDikeluarkanKTP] = useState(
    new Date()
  );
  const [kewarganegaraan, setKewarganegaraan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kodePos, setKodePos] = useState("");
  const { draftId } = useLocalSearchParams();
  const [substep, setSubstep] = useState(1);
  // console.log("sub", substepParams);

  const [draft, setDraft] = useState({ nama: "", NIK: "", tanggalLahir: "" });
  const [pictureTaken, setPictureTaken] = useState(false);
  const [fotoKTP, setFotoKTP] = useState(false);

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const existingDrafts = await AsyncStorage.getItem("drafts");
        const drafts = existingDrafts ? JSON.parse(existingDrafts) : [];
        const currentDraft = drafts.find((d) => {
          d.id == draftId && setDraft(d);
        });

        if (draft.step1) {
          console.log(draft.step1);
          setNama(draft.step1.nama || "");
          setNIK(draft.step1.NIK || "");
          setTanggalLahir(new Date(draft.step1.tanggalLahir) || new Date());
          setJenisKelamin(draft.step1.jenisKelamin || "");
          setTanggalDikeluarkanKTP(
            new Date(draft.step1.tanggalDikeluarkanKTP) || new Date()
          );
          setKewarganegaraan(draft.step1.kewarganegaraan || "");
          setAlamat(draft.step1.alamat || "");
          setProvinsi(draft.step1.provinsi || "");
          setKabupaten(draft.step1.kabupaten || "");
          setKecamatan(draft.step1.kecamatan || "");
          setKodePos(draft.step1.kodePos || "");
          console.log("yeah men", draft.step1.pictureTaken);
          if (draft.step1.pictureTaken) {
            setSubstep(2);
            console.log("substep final", 2);
          }
        }
      } catch (error) {
        console.error("Failed to fetch the draft", error);
      }
    };

    fetchDraft();
  }, [draftId, substep]);

  console.log("current", substep);

  const saveStepData = async (data) => {
    try {
      const existingDrafts = await AsyncStorage.getItem("drafts");
      const drafts = existingDrafts ? JSON.parse(existingDrafts) : [];
      const draftIndex = drafts.findIndex((d) => d.id == draftId);

      if (draftIndex !== -1) {
        drafts[draftIndex].step1 = { ...drafts[draftIndex].step1, ...data };
        await AsyncStorage.setItem("drafts", JSON.stringify(drafts));
        setDraft(drafts[draftIndex]);
        console.log("tes");
      }
    } catch (e) {
      console.error("Failed to save step data:", e);
    }
  };

  const handleContinue = () => {
    saveStepData({
      nama,
      NIK,
      tanggalLahir,
      jenisKelamin,
      tanggalDikeluarkanKTP,
      kewarganegaraan,
      alamat,
      provinsi,
      kabupaten,
      kecamatan,
      kodePos,
      pictureTaken,
      substep,
    });
    router.push({
      pathname: "/form/detailPermohonan",
      params: {
        draftId: draftId,
      },
    });
  };

  const handleAmbilFoto = () => {
    if (fotoKTP) {
      setPictureTaken(true);
      setSubstep(2);
    } else {
      setFotoKTP(true);
    }
  };

  const handleUnggahFoto = () => {
    if (fotoKTP) {
      setSubstep(1);
      console.log("reset substep to 1");
    } else {
      setFotoKTP(true);
    }
  };

  const getSubstepName = (substep) => {
    if (substep == 1) {
      return "Langkah 1: Unggah KTP";
    } else {
      return "Langkah 2: Verifikasi Data";
    }
  };

  console.log(substep);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isKTPDatePickerVisible, setKTPDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setTanggalLahir(date);
    hideDatePicker();
  };

  const showKTPDatePicker = () => {
    setKTPDatePickerVisibility(true);
  };

  const hideKTPDatePicker = () => {
    setKTPDatePickerVisibility(false);
  };

  const handleKTPConfirm = (date) => {
    setTanggalDikeluarkanKTP(date);
    hideKTPDatePicker();
  };

  const genderOptions = [
    { label: "Laki-laki", value: "laki-laki" },
    { label: "Perempuan", value: "perempuan" },
  ];

  const nationalityOptions = [
    { label: "Indonesia", value: "Indonesia" },
    { label: "Asing", value: "Asing" },
  ];

  const provinceOptions = [
    { label: "Jawa Barat", value: "Jawa Barat" },
    { label: "Jawa Tengah", value: "Jawa Tengah" },
    { label: "Jawa Timur", value: "Jawa Timur" },
  ];

  const kabupatenOptions = [
    { label: "Bandung", value: "Bandung" },
    { label: "Semarang", value: "Semarang" },
    { label: "Surabaya", value: "Surabaya" },
  ];

  const kecamatanOptions = [
    { label: "Kecamatan 1", value: "Kecamatan 1" },
    { label: "Kecamatan 2", value: "Kecamatan 2" },
    { label: "Kecamatan 3", value: "Kecamatan 3" },
  ];

  const kodePosOptions = [
    { label: "40123", value: "40123" },
    { label: "40234", value: "40234" },
    { label: "40345", value: "40345" },
  ];

  console.log(pictureTaken);
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        height: "100%",
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("../../assets/images/gradient-bg.png")}
        style={styles.navbar}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Ionicons
            name="chevron-back"
            color={colors.white}
            size={26}
            onPress={() => router.back()}
          />
          <View>
            <Text style={styles.navbarText}>Verifikasi NIK</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: colors.lightBlue,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 8,
            flexDirection: "column",
            gap: 10,
            marginHorizontal: 6,
          }}
        >
          <Text
            style={{ fontFamily: "FiraSansRegular", color: colors.darkBlue }}
          >
            {getSubstepName(substep)}
          </Text>
          <View style={{ gap: 10, flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: "70%" }}>
              <ProgressBar
                progress={substep / 2}
                color={colors.green}
                style={{ borderRadius: 10, height: 10 }}
              />
            </View>
            <Text style={{ fontFamily: "FiraSansRegular", color: "black" }}>
              {substep}/2 Langkah
            </Text>
          </View>
        </View>
      </ImageBackground>
      <ScrollView>
        {substep == 1 ? (
          <View
            style={{ flexDirection: "column", justifyContent: "space-between" }}
          >
            <View style={{ height: 440, backgroundColor: "black" }}>
              {fotoKTP ? (
                <Image
                  source={require("../../assets/images/ktp.png")}
                  style={{ margin: "auto" }}
                />
              ) : (
                <View
                  style={{
                    height: 217,
                    backgroundColor: colors.inactive,
                    width: 339,
                    margin: "auto",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      margin: "auto",
                    }}
                  >
                    Foto KTP
                  </Text>
                </View>
              )}
            </View>
            <View style={{ marginTop: 20 }}>
              <Button
                style={{
                  backgroundColor: colors.darkBlue,
                  width: "90%",
                  borderRadius: 12,
                  height: 48,
                  margin: "auto",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontFamily: "FiraSansMedium",
                  }}
                  onPress={handleAmbilFoto}
                >
                  {fotoKTP ? "Gunakan Foto" : "Ambil Foto"}
                </Text>
              </Button>
              <Button
                onPress={handleUnggahFoto}
                style={{
                  backgroundColor: colors.darkBlue,
                  width: "90%",
                  borderRadius: 12,
                  height: 48,
                  margin: "auto",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontFamily: "FiraSansMedium",
                  }}
                >
                  {fotoKTP ? "Unggah Foto" : "Foto Ulang"}
                </Text>
              </Button>
            </View>
          </View>
        ) : (
          <View style={{ height: "100%", padding: 20 }}>
            <Text
              style={{
                color: colors.darkBlue,
                fontFamily: "FiraSansRegular",
                marginBottom: 16,
              }}
            >
              Data di bawah ini harus sesuai dengan keterangan pada KTP pemohon.
              Data yang menggunakan (*) wajib diisi.
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                gap: 16,
                // marginBottom: 100,
              }}
            >
              <View style={styles.formGroup}>
                <Text style={styles.textForm}>
                  Nama Pemohon <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={nama}
                  onChangeText={setNama}
                  placeholder="Nama"
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.textForm}>
                  NIK <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={NIK}
                  onChangeText={setNIK}
                  placeholder="NIK"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.textForm}>
                  Tanggal Lahir <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TouchableOpacity
                  onPress={showDatePicker}
                  style={styles.datePicker}
                >
                  <Text style={styles.dateText}>
                    {tanggalLahir && tanggalLahir.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.textForm}>
                  Jenis Kelamin <Text style={{ color: "red" }}>*</Text>
                </Text>
                <Select
                  placeholder="Pilih Jenis Kelamin"
                  selectedValue={jenisKelamin}
                  width="full"
                  fontSize={15}
                  paddingHorizontal={10}
                  height={50}
                  borderRadius={10}
                  onValueChange={setJenisKelamin}
                >
                  {genderOptions.map((gender) => (
                    <Select.Item
                      key={gender.value}
                      label={gender.label}
                      value={gender.value}
                    />
                  ))}
                </Select>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.textForm}>
                  Tanggal Dikeluarkan KTP{" "}
                  <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TouchableOpacity
                  onPress={showKTPDatePicker}
                  style={styles.datePicker}
                >
                  <Text style={styles.dateText}>
                    {tanggalDikeluarkanKTP.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isKTPDatePickerVisible}
                  mode="date"
                  onConfirm={handleKTPConfirm}
                  onCancel={hideKTPDatePicker}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.textForm}>
                  Kewarganegaraan <Text style={{ color: "red" }}>*</Text>
                </Text>
                <Select
                  placeholder="Pilih Kewarganegaraan"
                  selectedValue={kewarganegaraan}
                  width="full"
                  fontSize={15}
                  paddingHorizontal={10}
                  height={50}
                  borderRadius={10}
                  onValueChange={setKewarganegaraan}
                >
                  {nationalityOptions.map((nationality) => (
                    <Select.Item
                      key={nationality.value}
                      label={nationality.label}
                      value={nationality.value}
                    />
                  ))}
                </Select>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.textForm}>
                  Alamat <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={alamat}
                  onChangeText={setAlamat}
                  placeholder="Alamat"
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.textForm}>
                  Provinsi <Text style={{ color: "red" }}>*</Text>
                </Text>
                <Select
                  placeholder="Pilih Provinsi"
                  selectedValue={provinsi}
                  width="full"
                  fontSize={15}
                  paddingHorizontal={10}
                  height={50}
                  borderRadius={10}
                  onValueChange={setProvinsi}
                >
                  {provinceOptions.map((province) => (
                    <Select.Item
                      key={province.value}
                      label={province.label}
                      value={province.value}
                    />
                  ))}
                </Select>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.textForm}>
                  Kabupaten <Text style={{ color: "red" }}>*</Text>
                </Text>
                <Select
                  placeholder="Pilih Kabupaten"
                  selectedValue={kabupaten}
                  width="full"
                  fontSize={15}
                  paddingHorizontal={10}
                  height={50}
                  borderRadius={10}
                  onValueChange={setKabupaten}
                >
                  {kabupatenOptions.map((kab) => (
                    <Select.Item
                      key={kab.value}
                      label={kab.label}
                      value={kab.value}
                    />
                  ))}
                </Select>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.textForm}>
                  Kecamatan <Text style={{ color: "red" }}>*</Text>
                </Text>
                <Select
                  placeholder="Pilih Kecamatan"
                  selectedValue={kecamatan}
                  width="full"
                  fontSize={15}
                  paddingHorizontal={10}
                  height={50}
                  borderRadius={10}
                  onValueChange={setKecamatan}
                >
                  {kecamatanOptions.map((kec) => (
                    <Select.Item
                      key={kec.value}
                      label={kec.label}
                      value={kec.value}
                    />
                  ))}
                </Select>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.textForm}>
                  Kode Pos <Text style={{ color: "red" }}>*</Text>
                </Text>
                <Select
                  placeholder="Pilih Kode Pos"
                  selectedValue={kodePos}
                  width="full"
                  fontSize={15}
                  paddingHorizontal={10}
                  height={50}
                  borderRadius={10}
                  onValueChange={setKodePos}
                >
                  {kodePosOptions.map((pos) => (
                    <Select.Item
                      key={pos.value}
                      label={pos.label}
                      value={pos.value}
                    />
                  ))}
                </Select>
              </View>
            </View>
            <View>
              <Button onPress={handleContinue}>Simpan</Button>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navbar: {
    // height: 160,
    justifyContent: "flex-start",
    justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    paddingTop: 30,
    // padding: 10,
    flexDirection: "column",
  },
  navbarText: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
    fontFamily: "FiraSansMedium",
  },
  input: {
    height: 48,
    borderColor: colors.grey,
    borderWidth: 1.5,
    marginBottom: 4,
    // marginTop: 16,
    paddingHorizontal: 8,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  textForm: {
    fontFamily: "FiraSansMedium",
    fontSize: 16,
    color: colors.darkBlue,
    marginBottom: 5,
    marginLeft: 6,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  formGroup: {
    marginBottom: 16,
  },
  textForm: {
    fontSize: 16,
    fontFamily: "FiraSansMedium",
    marginBottom: 6,
    marginLeft: 8,
    color: colors.darkBlue,
  },
  // input: {
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   padding: 8,
  //   borderRadius: 4,
  // },
  datePicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 48,
  },
  dateText: {
    fontSize: 14,
    marginVertical: "auto",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
  },
});
