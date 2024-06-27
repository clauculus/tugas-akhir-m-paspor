import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { colors } from "./../theme";
import { Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Step1() {
  const router = useRouter();
  const [substep, setSubstep] = useState(1);
  const [nama, setNama] = useState("Charlize");
  const [NIK, setNIK] = useState("43948394293");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const { draftId } = useLocalSearchParams();
  const [draft, setDraft] = useState({ nama: "", NIK: "", tanggalLahir: "" });

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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
        <View>
          <Text>Langkah 1: Unggah KTP</Text>
        </View>
      </ImageBackground>
      <View>
        {substep === 1 ? (
          <View>
            <Text>Step1</Text>
            <Button>Ambil Foto</Button>
            <Button onPress={() => setSubstep(2)}>Unggah Foto</Button>
            <Button>Informasi</Button>
          </View>
        ) : (
          <View>
            <TextInput
              style={styles.input}
              value={nama}
              onChangeText={setNama}
              placeholder="Nama"
            />
            <TextInput
              style={styles.input}
              value={NIK}
              onChangeText={setNIK}
              placeholder="NIK"
            />
            <TextInput
              style={styles.input}
              value={tanggalLahir}
              onChangeText={setTanggalLahir}
              placeholder="NIK"
            />
            <Button onPress={handleContinue}>Simpan</Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 80,
    justifyContent: "flex-start",
    justifyContent: "center",
    // alignItems: "center",
    paddingLeft: 10,
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
    marginTop: 16,
    paddingHorizontal: 8,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
