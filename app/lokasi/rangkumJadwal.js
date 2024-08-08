import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Button, Select } from "native-base";
import Checkbox from "expo-checkbox";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { colors } from "./../theme";
import { Modal, Portal } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RangkumJadwal() {
  const router = useRouter();
  const { lokasi, selectedDate, selectedTime, jenisPermohonan } =
    useLocalSearchParams();
  const detailLokasi = JSON.parse(lokasi);
  const [jenisPaspor, setJenisPaspor] = useState(null);

  const [isSelected, setSelection] = useState(false);
  const [isSelected2, setSelection2] = useState(false);

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [step, setStep] = useState(false);
  const containerStyle = {
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 35,
    paddingHorizontal: 30,
    width: "85%",
    margin: "auto",
    borderRadius: 18,
  };

  const saveDraft = async (draft) => {
    try {
      const existingDrafts = await AsyncStorage.getItem("drafts");
      const drafts = existingDrafts ? JSON.parse(existingDrafts) : [];

      const draftId = Date.now();
      drafts.push({ id: draftId, ...draft });

      await AsyncStorage.setItem("drafts", JSON.stringify(drafts));
      return draftId;
    } catch (error) {
      console.error("Failed to save the draft", error);
    }
  };

  const handleLanjut = () => {
    if (step) {
      hideModal();
      handleSaveAndRedirect();
    } else {
      setStep(true);
    }
  };

  const handleSaveAndRedirect = async () => {
    const createdAt = new Date();
    const status = "PENGISIAN FORMULIR";
    const step1 = {
      nama: "MIRA SETIAWAN",
      NIK: "3171234567890123",
      tanggalLahir: new Date(),
      jenisKelamin: "PEREMPUAN",
      tanggalDikeluarkanKTP: new Date(),
      kewarganegaraan: "INDONESIA",
      alamat: "JL. PASTI CEPAT A7/66, RT 007/008, PEGADUNGAN, KALIDERES",
      provinsi: "",
      kabupaten: "",
      kecamatan: "",
      kodePos: "",
      pictureTaken: "",
      substep: 0,
    };
    const step2 = {
      sudahMemilikiPaspor: "",
      tujuanMembuat: "",
      rencanaTinggal: "",
      namaKerabatInd: "",
      nomorTeleponKerabatInd: "",
      keteranganHubunganKerabatInd: "",
      negaraTujuan: "",
      tempatTinggalTujuan: "",
      namaKerabatTujuan: "",
      nomorTeleponTujuan: "",
      keteranganHubunganTujuan: "",
      substep: 0,
    };

    const step3 = {
      kkImage: "",
      aktaImage: "",
      substep: 0,
    };

    const step4 = {
      alamatSekarang: "",
      pekerjaanPemohon: "",
      nomorTeleponPemohon: "",
      statusSipilPemohon: "",
      namaIbu: "",
      kewarganegaraanIbu: "",
      alamatIbu: "",
      namaAyah: "",
      kewarganegaraanAyah: "",
      alamatAyah: "",
      namaPasangan: "",
      kewarganegaraanPasangan: "",
      alamatPasangan: "",
      substep: 0,
    };

    const draftId = await saveDraft({
      detailLokasi,
      selectedDate,
      selectedTime,
      jenisPaspor,
      jenisPermohonan,
      createdAt,
      status,
      step1,
      step2,
      step3,
      step4,
    });

    router.push({
      pathname: "/form/detailPermohonan",
      params: {
        draftId: draftId,
      },
    });
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("../../assets/images/gradient-bg.png")}
        style={styles.navbar}
      >
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            {step ? (
              <View>
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
                    fontFamily: "FiraSansRegular",
                    fontSize: 16,
                    color: colors.inactive,
                    marginBottom: 20,
                  }}
                >
                  Mohon isi kuesioner dengan{" "}
                  <Text
                    style={{
                      fontFamily: "FiraSansMedium",
                      color: colors.darkBlue,
                    }}
                  >
                    data yang benar
                  </Text>
                </Text>

                <Text
                  style={{
                    fontFamily: "FiraSansRegular",
                    fontSize: 16,
                    color: colors.inactive,
                    marginBottom: 20,
                  }}
                >
                  Pemberian keterangan yang tidak benar merupakan{" "}
                  <Text
                    style={{
                      fontFamily: "FiraSansMedium",
                      color: colors.darkBlue,
                    }}
                  >
                    pelanggaran peraturan keimigrasian
                  </Text>{" "}
                  dan akan mengakibatkan permohonan paspor Anda ditolak dan
                  pembayaran tidak dapat dikembalikan.
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <Checkbox value={isSelected2} onValueChange={setSelection2} />

                  <Text
                    style={{
                      fontFamily: "FiraSansRegular",
                      fontSize: 14,
                      color: colors.darkBlue,
                      width: "80%",
                    }}
                  >
                    Ya, saya akan mengisi kuesioner dengan data yang benar
                  </Text>
                </View>
              </View>
            ) : (
              <View>
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
                <Ionicons
                  name="alert-circle"
                  color="red"
                  style={{ margin: "auto", marginBottom: 10 }}
                  size={32}
                />
                <Text
                  style={{
                    fontFamily: "FiraSansMedium",
                    fontSize: 22,
                    textAlign: "center",
                    color: colors.darkBlue,
                    marginBottom: 20,
                  }}
                >
                  Peringatan
                </Text>
                <View>
                  <Text
                    style={{
                      fontFamily: "FiraSansRegular",
                      fontSize: 16,
                      color: colors.inactive,
                    }}
                  >
                    Anda harus menyelesaikan{" "}
                    <Text
                      style={{
                        fontFamily: "FiraSansMedium",
                        color: colors.darkBlue,
                      }}
                    >
                      pengisian kuesioner paspor
                    </Text>{" "}
                    dan{" "}
                    <Text
                      style={{
                        fontFamily: "FiraSansMedium",
                        color: colors.darkBlue,
                      }}
                    >
                      pembayaran{" "}
                    </Text>
                    dalam durasi
                    <Text
                      style={{
                        fontFamily: "FiraSansMedium",
                        color: colors.darkBlue,
                      }}
                    >
                      {" "}
                      2 jam.{" "}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      fontFamily: "FiraSansRegular",
                      fontSize: 16,
                      color: colors.inactive,
                      marginTop: 20,
                      marginBottom: 20,
                    }}
                  >
                    Kuota permohonan paspor akan disimpan dalam jangka waktu
                    tersebut.
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <Checkbox value={isSelected} onValueChange={setSelection} />

                  <Text
                    style={{
                      fontFamily: "FiraSansRegular",
                      fontSize: 14,
                      color: colors.darkBlue,
                      width: "80%",
                    }}
                  >
                    Ya, saya akan menyelesaikan pengisian kuesioner paspor dan
                    pembayaran dalam 2 jam
                  </Text>
                </View>
              </View>
            )}
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: (step ? isSelected2 : isSelected)
                  ? colors.darkBlue
                  : "#91A9BA",
                width: "100%",
                borderRadius: 12,
                height: 48,
                margin: "auto",
              }}
              disabled={step ? !isSelected2 : !isSelected}
              onPress={handleLanjut}
            >
              <Text
                style={{
                  color: colors.white,
                  fontSize: 16,
                  fontFamily: "FiraSansMedium",
                  margin: "auto",
                }}
              >
                Lanjut
              </Text>
            </TouchableOpacity>
          </Modal>
        </Portal>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="chevron-back"
            color={colors.white}
            size={26}
            onPress={() => router.back()}
          />
          <View>
            <Text style={styles.navbarText}>Pilih Tanggal Kedatangan</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.container}>
        <View>
          <View style={styles.formGroup}>
            <Text style={styles.textForm}>
              Lokasi Kantor Imigrasi <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={detailLokasi.lokasi.nama}
              placeholder="Nama"
              editable={false}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.textForm}>
              Tanggal Kedatangan <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={selectedDate + " Agustus 2024"}
              placeholder="Nama"
              editable={false}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.textForm}>
              Waktu Kedatangan <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={selectedTime + " WIB"}
              placeholder="Nama"
              editable={false}
            />
          </View>
          <Text style={styles.textForm}>
            Jenis Paspor <Text style={{ color: "red" }}>*</Text>
          </Text>
          <Select
            placeholder="Pilih jenis paspor"
            selectedValue={jenisPaspor}
            width="full"
            fontSize={15}
            paddingHorizontal={10}
            height={50}
            borderRadius={10}
            onValueChange={(e) => setJenisPaspor(e)}
          >
            {detailLokasi.lokasi.isBiasa && (
              <Select.Item label={"Paspor Biasa"} value={"Biasa"} />
            )}
            {detailLokasi.lokasi.isElektronik && (
              <Select.Item label={"Paspor Elektronik"} value={"Elektronik"} />
            )}
            {detailLokasi.lokasi.isPolikarbonat && (
              <Select.Item label={"Polikarbonat"} value={"Polikarbonat"} />
            )}
          </Select>
          {/* <Text>{detailLokasi.lokasi.nama}</Text>
          <Text>{selectedDate}</Text>
          <Text>{selectedTime}</Text> */}
          {/* <Button onPress={handleSaveAndRedirect}>Lanjut</Button> */}
        </View>
      </View>
      <View style={{ flex: 1, paddingTop: 26, paddingHorizontal: 26 }}>
        <Button
          style={{
            backgroundColor: colors.darkBlue,
            width: "100%",
            borderRadius: 12,
            height: 48,
            margin: "auto",
            marginBottom: 10,
          }}
          onPress={showModal}

          // onPress={handleSaveAndRedirect}
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

const styles = StyleSheet.create({
  navbar: {
    height: 80,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 10,
    flexDirection: "row",
  },
  navbarText: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
    fontFamily: "FiraSansMedium",
  },
  container: {
    flex: 1,
    paddingTop: 26,
    paddingHorizontal: 26,
    justifyContent: "space-between",
    minHeight: 570,
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
  input: {
    height: 48,
    borderColor: colors.grey,
    borderWidth: 1,
    marginBottom: 4,
    // marginTop: 16,
    paddingHorizontal: 8,
    width: "100%",
    color: colors.inactive,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
