import { View, Text, Image, TextInput } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { colors } from "./../theme";
import { Button, Select } from "native-base";
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
        height: "100%",
        alignItems: "center",
        flex: 1,
        paddingVertical: 50,
        paddingHorizontal: 50,
        rowGap: 20,
      }}
    >
      <Select
        placeholder="Pilih kota"
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
      <Text>{detailLokasi.lokasi.nama}</Text>
      <Text>{selectedDate}</Text>
      <Text>{selectedTime}</Text>
      <Button onPress={handleSaveAndRedirect}>Lanjut</Button>
    </SafeAreaView>
  );
}
