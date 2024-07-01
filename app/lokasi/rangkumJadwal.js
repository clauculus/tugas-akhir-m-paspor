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
import { useState } from "react";
import { colors } from "./../theme";
import { Button, Select } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RangkumJadwal() {
  const router = useRouter();
  const { lokasi, selectedDate, selectedTime, jenisPermohonan } =
    useLocalSearchParams();
  const detailLokasi = JSON.parse(lokasi);
  const [jenisPaspor, setJenisPaspor] = useState(null);

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

  const handleSaveAndRedirect = async () => {
    const createdAt = new Date();
    const status = "Menunggu Pembayaran";

    const draftId = await saveDraft({
      detailLokasi,
      selectedDate,
      selectedTime,
      jenisPaspor,
      jenisPermohonan,
      createdAt,
      status,
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
        // height: "100%",
        // alignItems: "center",
        flex: 1,
        // paddingVertical: 50,
        // paddingHorizontal: 50,
        // rowGap: 20,
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
              value={selectedDate + " Maret 2024"}
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
          onPress={handleSaveAndRedirect}
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
