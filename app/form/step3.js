import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { colors } from "./../theme";
import { Button } from "native-base";
import { ProgressBar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Step3() {
  const router = useRouter();

  const [kkImage, setKkImage] = useState(null);
  const [aktaImage, setAktaImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { draftId } = useLocalSearchParams();

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        console.log("fetching");
        const existingDrafts = await AsyncStorage.getItem("drafts");
        const drafts = existingDrafts ? JSON.parse(existingDrafts) : [];
        if (draftId) {
          const draftIndex = drafts.findIndex((d) => d.id == draftId);
          const draft = drafts[draftIndex];

          if (draft.step3) {
            setKkImage(draft.step3.kkImage || null);
            setAktaImage(draft.step3.aktaImage || null);
          }
        }
      } catch (error) {
        console.error("Failed to fetch the draft", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDraft();
  }, [draftId]);

  const saveStepData = async (data) => {
    try {
      const existingDrafts = await AsyncStorage.getItem("drafts");
      const drafts = existingDrafts ? JSON.parse(existingDrafts) : [];
      const draftIndex = drafts.findIndex((d) => d.id == draftId);
      if (draftIndex !== -1) {
        drafts[draftIndex].step3 = { ...drafts[draftIndex].step3, ...data };
        await AsyncStorage.setItem("drafts", JSON.stringify(drafts));
      }
    } catch (e) {
      console.error("Failed to save step data:", e);
    }
  };

  const handleContinue = () => {
    saveStepData({
      kkImage,
      aktaImage,
    });

    router.push({
      pathname: "/form/detailPermohonan",
      params: {
        draftId: draftId,
      },
    });
  };
  useEffect(() => {
    (async () => {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (
        cameraPermission.status !== "granted" ||
        mediaLibraryPermission.status !== "granted"
      ) {
        Alert.alert(
          "Permissions Error",
          "Camera and media library permissions are required."
        );
      }
    })();
  }, []);

  const handleUpload = async (setImage) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(true);
      // setImage(result.assets[0].uri);
    }
  };

  const handlePhoto = async (setImage) => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(true);
      // setImage(result.assets[0].uri);
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
            <Text style={styles.navbarText}>Data Tambahan Permohon</Text>
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
            Dokumen Tambahan Pemohon
          </Text>
          <View style={{ gap: 10, flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: "70%" }}>
              <ProgressBar
                progress={1}
                color={colors.green}
                style={{ borderRadius: 10, height: 10 }}
              />
            </View>
            <Text style={{ fontFamily: "FiraSansRegular", color: "black" }}>
              1/1 Langkah
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View
        style={{
          paddingTop: 26,
          paddingHorizontal: 26,
          justifyContent: "space-between",
          minHeight: 570,
        }}
      >
        <Text
          style={{
            color: colors.darkBlue,
            fontFamily: "FiraSansRegular",
            marginBottom: 30,
          }}
        >
          *) Unggah Dokumen hanya bisa berbentuk JPG.
        </Text>
        <View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.textForm}>
              Kartu Keluarga <Text style={{ color: "red" }}>*</Text>
            </Text>
            <View>
              {kkImage ? (
                <TouchableOpacity style={styles.buttonUploaded}>
                  <Text style={styles.buttonText}>kk.jpg</Text>
                  <Ionicons
                    name="close-outline"
                    size={20}
                    color={colors.darkBlue}
                    onPress={() => setKkImage(null)}
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handlePhoto(setKkImage)}
                  >
                    <Ionicons name="camera" size={20} color={colors.darkBlue} />
                    <Text style={styles.buttonText}>Foto Dokumen</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleUpload(setKkImage)}
                  >
                    <Ionicons
                      name="document-attach"
                      size={20}
                      color={colors.darkBlue}
                    />
                    <Text style={styles.buttonText}>Unggah Dokumen</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.textForm}>
              Akta kelahiran/ijazah/akta perkawinan/buku nikah/surat baptis{" "}
              <Text style={{ color: "red" }}>*</Text>
            </Text>
            {aktaImage ? (
              <TouchableOpacity style={styles.buttonUploaded}>
                <Text style={styles.buttonText}>akta.jpg</Text>
                <Ionicons
                  name="close-outline"
                  size={20}
                  color={colors.darkBlue}
                  onPress={() => setAktaImage(null)}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handlePhoto(setAktaImage)}
                >
                  <Ionicons name="camera" size={20} color={colors.darkBlue} />
                  <Text style={styles.buttonText}>Foto Dokumen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleUpload(setAktaImage)}
                >
                  <Ionicons
                    name="document-attach"
                    size={20}
                    color={colors.darkBlue}
                  />
                  <Text style={styles.buttonText}>Unggah Dokumen</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            style={{
              backgroundColor: colors.darkBlue,
              width: "100%",
              borderRadius: 12,
              height: 48,
              margin: "auto",
              marginBottom: 10,
            }}
            onPress={handleContinue}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "FiraSansMedium",
              }}
            >
              Simpan dan Lanjut
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navbar: {
    justifyContent: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    paddingTop: 30,
    flexDirection: "column",
  },
  navbarText: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
    fontFamily: "FiraSansMedium",
  },
  textForm: {
    fontSize: 16,
    fontFamily: "FiraSansMedium",
    marginBottom: 6,
    marginLeft: 8,
    color: colors.darkBlue,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "49%",
    backgroundColor: colors.white,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.darkBlue,
  },
  buttonText: {
    color: colors.darkBlue,
    marginLeft: 6,
    fontFamily: "FiraSansRegular",
  },
  buttonUploaded: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "49%",
    backgroundColor: colors.white,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.darkBlue,
  },
});
