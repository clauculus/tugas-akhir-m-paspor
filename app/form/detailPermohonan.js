import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { colors } from "./../theme";
import { Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DetailPermohonan() {
  const router = useRouter();
  const { draftId } = useLocalSearchParams();
  const [currentStep, setCurrentStep] = useState(null);

  const [draft, setDraft] = useState({});

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        console.log(draftId);
        const existingDrafts = await AsyncStorage.getItem("drafts");
        const drafts = existingDrafts ? JSON.parse(existingDrafts) : [];
        const currentDraft = drafts.find((d) => {
          d.id == draftId && setDraft(d);
        });
        // setDraft(currentDraft);
        // console.log("hi", currentDraft);
        // console.log("ini currentDraft", draft);
      } catch (error) {
        console.error("Failed to fetch the draft", error);
      }
    };

    fetchDraft();
  }, [draftId]);

  const saveDrafts = async (newDraft) => {
    try {
      const existingDrafts = await AsyncStorage.getItem("drafts");
      const drafts = existingDrafts ? JSON.parse(existingDrafts) : [];
      const updatedDrafts = drafts.map((d) =>
        d.id === newDraft.id ? newDraft : d
      );
      await AsyncStorage.setItem("drafts", JSON.stringify(updatedDrafts));
    } catch (e) {
      console.error("Failed to save draft to storage:", e);
    }
  };

  // const handleStepChange = (step, data) => {
  //   const updatedDraft = {
  //     ...draft,
  //     [step]: data,
  //   };
  //   setDraft(updatedDraft);
  //   saveDrafts(updatedDraft);
  //   setCurrentStep(null); // Return to summary page
  // };

  const handleStepChange = (step) => {
    router.push({
      pathname: `/form/${step}`,
      params: {
        draftId,
        substep: 1,
      },
    });
  };

  if (!draft) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log(draft, "drafttttttttttt");

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
            <Text style={styles.navbarText}>Permohonan Paspor</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={{ padding: 24, gap: 4 }}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              width: "50%",
              fontSize: 16,
              color: colors.darkBlue,
              fontFamily: "FiraSansMedium",
            }}
          >
            Lokasi
          </Text>
          {draft.detailLokasi && (
            <Text style={{ fontFamily: "FiraSansRegular", fontSize: 16 }}>
              : {draft.detailLokasi.lokasi.nama}
            </Text>
          )}
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              width: "50%",
              fontSize: 16,
              color: colors.darkBlue,
              fontFamily: "FiraSansMedium",
            }}
          >
            Tanggal Kedatangan
          </Text>
          <Text style={{ fontFamily: "FiraSansRegular", fontSize: 16 }}>
            : {draft.selectedDate} Maret 2024
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              width: "50%",
              fontSize: 16,
              color: colors.darkBlue,
              fontFamily: "FiraSansMedium",
            }}
          >
            Jam Kedatangan
          </Text>
          <Text style={{ fontFamily: "FiraSansRegular", fontSize: 16 }}>
            : {draft.selectedTime}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              width: "50%",
              fontSize: 16,
              color: colors.darkBlue,
              fontFamily: "FiraSansMedium",
            }}
          >
            Tanggal Pengajuan
          </Text>
          <Text style={{ fontFamily: "FiraSansRegular", fontSize: 16 }}>
            : {draft.selectedTime}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#CAFFCA",
            marginVertical: 10,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ fontFamily: "FiraSansRegular", color: colors.darkGreen }}
          >
            Selesaikan dalam
          </Text>
          <Text>02:00:00</Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderRadius: 1,
            borderColor: "#E8E8E8",
            paddingBottom: 16,
          }}
        >
          <Text
            style={{
              fontFamily: "FiraSansRegular",
              fontSize: 13,
              color: colors.inactive,
            }}
          >
            Waktu yang tertera di atas merupakan sisa waktu untuk mengisi data
            pemohon dan melakukan pembayaran.
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "FiraSansMedium",
              fontSize: 22,
              color: colors.darkBlue,
              marginVertical: 20,
            }}
          >
            Data Pemohon
          </Text>
          <View style={{ flexDirection: "column", gap: 16 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                shadowColor: "#000",
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.25,
                shadowRadius: 2,
                elevation: 1,
                borderRadius: 18,
                padding: 20,
                borderWidth: 0.5,
                borderColor: "#6FA39A",
              }}
              onPress={() => handleStepChange("step1")}
            >
              <Text
                style={{
                  fontFamily: "FiraSansMedium",
                  fontSize: 18,
                  color: colors.darkBlue,
                }}
              >
                Verifikasi NIK
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                shadowColor: "#000",
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.25,
                shadowRadius: 2,
                elevation: 1,
                borderRadius: 18,
                padding: 20,
                borderWidth: 0.5,
                borderColor: "#6FA39A",
              }}
            >
              <Text
                style={{
                  fontFamily: "FiraSansMedium",
                  fontSize: 18,
                  color: colors.darkBlue,
                }}
              >
                Kuesioner Permohonan Paspor
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                shadowColor: "#000",
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.25,
                shadowRadius: 2,
                elevation: 1,
                borderRadius: 18,
                padding: 20,
                borderWidth: 0.5,
                borderColor: "#6FA39A",
              }}
            >
              <Text
                style={{
                  fontFamily: "FiraSansMedium",
                  fontSize: 18,
                  color: colors.darkBlue,
                }}
              >
                Unggah Dokumen
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                shadowColor: "#000",
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.25,
                shadowRadius: 2,
                elevation: 1,
                borderRadius: 18,
                padding: 20,
                borderWidth: 0.5,
                borderColor: "#6FA39A",
              }}
            >
              <Text
                style={{
                  fontFamily: "FiraSansMedium",
                  fontSize: 18,
                  color: colors.darkBlue,
                }}
              >
                Data Tambahan Pemohon
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    // padding: 10,
    flexDirection: "row",
  },
  navbarText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
});
