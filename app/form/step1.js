import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { colors } from "./../theme";
import { Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressBar, MD3Colors } from "react-native-paper";

export default function Step1() {
  const router = useRouter();
  const [substep, setSubstep] = useState(1);
  const [nama, setNama] = useState("Charlize");
  const [NIK, setNIK] = useState("43948394293");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [tanggalKTP, setTanggalKTP] = useState("");
  const [kewarganegaraan, setKewarganegaraan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kodePos, setKodePos] = useState("");
  const { draftId } = useLocalSearchParams();
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
          setNama(draft.step1.nama || "");
          setNIK(draft.step1.NIK || "");
          setTanggalLahir(draft.step1.tanggalLahir || "");
        }
      } catch (error) {
        console.error("Failed to fetch the draft", error);
      }
    };

    fetchDraft();
  }, [draftId, substep]);

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
    saveStepData({ nama, NIK, tanggalLahir });
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
    } else {
      setFotoKTP(true);
    }
  };

  const getSubstepName = (substep) => {
    if (substep === 1) {
      return "Langkah 1: Unggah KTP";
    } else {
      return "Langkah 2: Verifikasi Data";
    }
  };

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
      <View>
        {substep === 1 ? (
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
          <ScrollView style={{ padding: 20 }}>
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
            <View style={{ flexDirection: "column", gap: 16 }}>
              <View>
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
              <View>
                <Text style={styles.textForm}>
                  NIK <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={NIK}
                  onChangeText={setNIK}
                  placeholder="NIK"
                />
              </View>
              <View>
                <Text style={styles.textForm}>
                  Tanggal Lahir <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={tanggalLahir}
                  onChangeText={setTanggalLahir}
                  placeholder="Tanggal Lahir"
                />
              </View>
            </View>
            <Button onPress={handleContinue}>Simpan</Button>
          </ScrollView>
        )}
      </View>
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
});
