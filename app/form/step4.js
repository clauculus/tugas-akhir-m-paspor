import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { colors } from "./../theme";
import { Button, Radio, Select } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Step4() {
  const router = useRouter();

  const [alamatSekarang, setAlamatSekarang] = useState("");
  const [pekerjaanPemohon, setPekerjaanPemohon] = useState("");
  const [nomorTeleponPemohon, setNomorTeleponPemohon] = useState("");
  const [statusSipilPemohon, setStatusSipilPemohon] = useState("");
  const [namaIbu, setNamaIbu] = useState("");
  const [kewarganegaraanIbu, setKewarganegaraanIbu] = useState("");
  const [alamatIbu, setAlamatIbu] = useState("");
  const [namaAyah, setNamaAyah] = useState("");
  const [kewarganegaraanAyah, setKewarganegaraanAyah] = useState("");
  const [alamatAyah, setAlamatAyah] = useState("");
  const [namaPasangan, setNamaPasangan] = useState("");
  const [kewarganegaraanPasangan, setKewarganegaraanPasangan] = useState("");
  const [alamatPasangan, setAlamatPasangan] = useState("");

  const [substep, setSubstep] = useState(1);
  const { draftId } = useLocalSearchParams();
  const [draft, setDraft] = useState({});

  const pekerjaanOptions = [
    { label: "Pegawai Negeri", value: "Pegawai Negeri" },
    { label: "Pegawai Swasta", value: "Pegawai Swasta" },
    { label: "Wirausaha", value: "Wirausaha" },
    { label: "Pelajar/Mahasiswa", value: "Pelajar/Mahasiswa" },
    { label: "Ibu Rumah Tangga", value: "Ibu Rumah Tangga" },
    { label: "Pensiunan", value: "Pensiunan" },
    { label: "Lainnya", value: "Lainnya" },
  ];

  const statusSipilOptions = [
    { label: "Belum Menikah", value: "Belum Menikah" },
    { label: "Menikah", value: "Menikah" },
    { label: "Cerai Hidup", value: "Cerai Hidup" },
    { label: "Cerai Mati", value: "Cerai Mati" },
  ];

  const kewarganegaraanOptions = [
    { label: "WNI", value: "WNI" },
    { label: "WNA", value: "WNA" },
  ];

  const tujuanMembuatOptions = [
    { label: "Wisata", value: "Wisata" },
    { label: "Umroh", value: "Umroh" },
    { label: "Haji", value: "Haji" },
    { label: "Bekerja Formal", value: "Bekerja Formal" },
    {
      label: "Pekerja Migran Indonesia (PMI)",
      value: "Pekerja Migran Indonesia (PMI)",
    },
    { label: "Belajar", value: "Belajar" },
    { label: "Berobat", value: "Berobat" },
  ];

  const rencanaTinggalOptions = [
    { label: "< 1 Bulan", value: "< 1 Bulan" },
    { label: "< 6 Bulan", value: "< 6 Bulan" },
    { label: "< 1 Tahun", value: "< 1 Tahun" },
    { label: "< 5 Tahun", value: "< 5 Tahun" },
    { label: "> 5 Tahun", value: "> 5 Tahun" },
  ];

  const provinceOptions = [
    { label: "Jawa Barat", value: "Jawa Barat" },
    { label: "Jawa Tengah", value: "Jawa Tengah" },
    { label: "Jawa Timur", value: "Jawa Timur" },
  ];

  const hubunganKeluargaOptions = [
    { label: "Orang tua", value: "Orang tua" },
    { label: "Kakak/Adik", value: "Kakak/Adik" },
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        console.log("fetching");
        const existingDrafts = await AsyncStorage.getItem("drafts");
        const drafts = existingDrafts ? JSON.parse(existingDrafts) : [];
        if (draftId) {
          const draftIndex = drafts.findIndex((d) => d.id == draftId);
          const draft = drafts[draftIndex];

          if (draft.step4) {
            setAlamatSekarang(draft.step4.alamatSekarang || "");
            setPekerjaanPemohon(draft.step4.pekerjaanPemohon || "");
            setNomorTeleponPemohon(draft.step4.nomorTeleponPemohon || "");
            setStatusSipilPemohon(draft.step4.statusSipilPemohon || "");
            setNamaIbu(draft.step4.namaIbu || "");
            setKewarganegaraanIbu(draft.step4.kewarganegaraanIbu || "");
            setAlamatIbu(draft.step4.alamatIbu || "");
            setNamaAyah(draft.step4.namaAyah || "");
            setKewarganegaraanAyah(draft.step4.kewarganegaraanAyah || "");
            setAlamatAyah(draft.step4.alamatAyah || "");
            setNamaPasangan(draft.step4.namaPasangan || "");
            setKewarganegaraanPasangan(
              draft.step4.kewarganegaraanPasangan || ""
            );
            setAlamatPasangan(draft.step4.alamatPasangan || "");
          }
        }
      } catch (error) {
        console.error("Failed to fetch the draft", error);
      } finally {
        setLoading(false);
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
        drafts[draftIndex].step4 = { ...drafts[draftIndex].step4, ...data };
        await AsyncStorage.setItem("drafts", JSON.stringify(drafts));
        setDraft(drafts[draftIndex]);
      }
    } catch (e) {
      console.error("Failed to save step data:", e);
    }
  };

  const handleContinue = () => {
    saveStepData({
      alamatSekarang,
      pekerjaanPemohon,
      nomorTeleponPemohon,
      statusSipilPemohon,
      namaIbu,
      kewarganegaraanIbu,
      alamatIbu,
      namaAyah,
      kewarganegaraanAyah,
      alamatAyah,
      namaPasangan,
      kewarganegaraanPasangan,
      alamatPasangan,
      substep,
    });
    if (substep !== 4) {
      setSubstep(substep + 1);
    } else {
      router.push({
        pathname: "/form/detailPermohonan",
        params: {
          draftId: draftId,
        },
      });
    }
  };

  const getSubstepName = (substep) => {
    if (substep == 1) {
      return "Langkah 1: Alamat Domisili";
    } else if (substep == 2) {
      return "Langkah 2: Keterangan Tambahan Pemohon";
    } else if (substep == 3) {
      return "Langkah 3: Keterangan Ibu Pemohon";
    } else if (substep == 4) {
      return "Langkah 4: Keterangan Lain Pemohon (Opsional)";
    } else {
      return "Others";
    }
  };

  if (loading) {
    return <Text>hehe</Text>;
  }

  return (
    <SafeAreaView
      edges={["right", "left", "top"]}
      style={{
        backgroundColor: "#FFFFFF",
        // height: "100%",
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
            {getSubstepName(substep)}
          </Text>
          <View style={{ gap: 10, flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: "70%" }}>
              <ProgressBar
                progress={substep / 4}
                color={colors.green}
                style={{ borderRadius: 10, height: 10 }}
              />
            </View>
            <Text style={{ fontFamily: "FiraSansRegular", color: "black" }}>
              {substep}/4 Langkah
            </Text>
          </View>
        </View>
      </ImageBackground>
      <ScrollView style={{ flex: 1 }}>
        {substep == 1 && (
          <View
            style={{
              paddingTop: 26,
              paddingHorizontal: 26,
              flex: 1,
              justifyContent: "space-between",
              minHeight: 570,
              // height: "100%",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "FiraSansMedium",
                  fontSize: 22,
                  marginBottom: 20,
                }}
              >
                Apakah alamat anda sekarang sama seperti alamat pada KTP?
                <Text style={{ color: "red" }}> *</Text>
              </Text>
              <Radio.Group
                name="myRadioGroup"
                value={alamatSekarang}
                onChange={(e) => setAlamatSekarang(e)}
              >
                <View style={styles.pickOne}>
                  <Radio value="ya" my="1" size="sm">
                    <View style={{ flexDirection: "column", marginLeft: 8 }}>
                      <Text
                        style={{
                          fontFamily: "FiraSansRegular",
                          fontSize: 16,
                          color: colors.darkBlue,
                        }}
                      >
                        Ya
                      </Text>
                    </View>
                  </Radio>
                </View>
                <View style={styles.pickOne}>
                  <Radio value="tidak" my="1" size="sm">
                    <Text
                      style={{
                        fontFamily: "FiraSansRegular",
                        fontSize: 15,
                        color: colors.darkBlue,
                        marginLeft: 8,
                      }}
                    >
                      Tidak
                    </Text>
                  </Radio>
                </View>
              </Radio.Group>
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
        )}
        {substep == 2 && (
          <View
            style={{
              paddingTop: 26,
              paddingHorizontal: 26,
              flex: 1,
              justifyContent: "space-between",
              minHeight: 570,
              // height: "100%",
            }}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.formGroup}>
                <Text style={styles.textForm}>
                  Pekerjaan
                  <Text style={{ color: "red" }}>*</Text>
                </Text>
                <Select
                  placeholder="Pilih salah satu"
                  selectedValue={pekerjaanPemohon}
                  width="full"
                  fontSize={15}
                  paddingHorizontal={10}
                  height={50}
                  borderRadius={10}
                  onValueChange={setPekerjaanPemohon}
                >
                  {pekerjaanOptions.map((province) => (
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
                  Nomor Telepon <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={nomorTeleponPemohon}
                  onChangeText={setNomorTeleponPemohon}
                  placeholder="Nomor telepon"
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.textForm}>
                  Status Sipil
                  <Text style={{ color: "red" }}>*</Text>
                </Text>
                <Select
                  placeholder="Pilih salah satu"
                  selectedValue={statusSipilPemohon}
                  width="full"
                  fontSize={15}
                  paddingHorizontal={10}
                  height={50}
                  borderRadius={10}
                  onValueChange={setStatusSipilPemohon}
                >
                  {statusSipilOptions.map((status) => (
                    <Select.Item
                      key={status.value}
                      label={status.label}
                      value={status.value}
                    />
                  ))}
                </Select>
              </View>
            </View>
            <View style={{ flex: 1, marginTop: 20, marginBottom: 30 }}>
              <Button style={styles.blueButton} onPress={handleContinue}>
                <Text style={styles.buttonTextWhite}>Simpan dan Lanjut</Text>
              </Button>
              <Button onPress={() => setSubstep(1)} style={styles.whiteButton}>
                <Text style={styles.buttonText}>Kembali</Text>
              </Button>
            </View>
          </View>
        )}
        {substep == 3 && (
          <View
            style={{
              paddingTop: 26,
              paddingHorizontal: 26,
              flex: 1,
              justifyContent: "space-between",
              minHeight: 570,
            }}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.formGroup}>
                <Text style={styles.textForm}>
                  Nama Ibu <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={namaIbu}
                  onChangeText={setNamaIbu}
                  placeholder="Nama"
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.textForm}>
                  Kewarganegaraan Ibu
                  <Text style={{ color: "red" }}>*</Text>
                </Text>
                <Select
                  placeholder="Pilih salah satu"
                  selectedValue={kewarganegaraanIbu}
                  width="full"
                  fontSize={15}
                  paddingHorizontal={10}
                  height={50}
                  borderRadius={10}
                  onValueChange={setKewarganegaraanIbu}
                >
                  {kewarganegaraanOptions.map((item) => (
                    <Select.Item
                      key={item.value}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </Select>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.textForm}>
                  Alamat Ibu <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={alamatIbu}
                  onChangeText={setAlamatIbu}
                  placeholder="Alamat"
                />
              </View>
            </View>
            <View style={{ flex: 1, marginTop: 20, marginBottom: 30 }}>
              <Button style={styles.blueButton} onPress={handleContinue}>
                <Text style={styles.buttonTextWhite}>Simpan dan Lanjut</Text>
              </Button>
              <Button onPress={() => setSubstep(2)} style={styles.whiteButton}>
                <Text style={styles.buttonText}>Kembali</Text>
              </Button>
            </View>
          </View>
        )}
        {substep == 4 && (
          <View
            style={{
              paddingTop: 26,
              paddingHorizontal: 26,
              flex: 1,
              justifyContent: "space-between",
              minHeight: 570,
              // height: "100%",
            }}
          >
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, marginBottom: 30 }}>
                <Text
                  style={{
                    fontFamily: "FiraSansMedium",
                    fontSize: 22,
                    marginBottom: 20,
                    color: colors.darkBlue,
                  }}
                >
                  Keterangan Ayah
                </Text>
                <View style={styles.formGroup}>
                  <Text style={styles.textForm}>Nama Ayah</Text>
                  <TextInput
                    style={styles.input}
                    value={namaAyah}
                    onChangeText={setNamaAyah}
                    placeholder="Nama"
                  />
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.textForm}>Kewarganegaraan Ayah</Text>
                  <Select
                    placeholder="Pilih salah satu"
                    selectedValue={kewarganegaraanAyah}
                    width="full"
                    fontSize={15}
                    paddingHorizontal={10}
                    height={50}
                    borderRadius={10}
                    onValueChange={setKewarganegaraanAyah}
                  >
                    {kewarganegaraanOptions.map((item) => (
                      <Select.Item
                        key={item.value}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </Select>
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.textForm}>Alamat Ayah</Text>
                  <TextInput
                    style={styles.input}
                    value={alamatAyah}
                    onChangeText={setAlamatAyah}
                    placeholder="Alamat"
                  />
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "FiraSansMedium",
                    fontSize: 22,
                    marginBottom: 20,
                    color: colors.darkBlue,
                  }}
                >
                  Keterangan Pasangan
                </Text>
                <View style={styles.formGroup}>
                  <Text style={styles.textForm}>Nama Pasangan</Text>
                  <TextInput
                    style={styles.input}
                    value={namaPasangan}
                    onChangeText={setNamaPasangan}
                    placeholder="Nama"
                  />
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.textForm}>Kewarganegaraan Pasangan</Text>
                  <Select
                    placeholder="Pilih salah satu"
                    selectedValue={kewarganegaraanPasangan}
                    width="full"
                    fontSize={15}
                    paddingHorizontal={10}
                    height={50}
                    borderRadius={10}
                    onValueChange={setKewarganegaraanPasangan}
                  >
                    {kewarganegaraanOptions.map((item) => (
                      <Select.Item
                        key={item.value}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </Select>
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.textForm}>Alamat Pasangan</Text>
                  <TextInput
                    style={styles.input}
                    value={alamatPasangan}
                    onChangeText={setAlamatPasangan}
                    placeholder="Alamat"
                  />
                </View>
              </View>
            </View>
            <View style={{ flex: 1, marginTop: 20, marginBottom: 30 }}>
              <Button style={styles.blueButton} onPress={handleContinue}>
                <Text style={styles.buttonTextWhite}>Simpan dan Lanjut</Text>
              </Button>
              <Button onPress={() => setSubstep(3)} style={styles.whiteButton}>
                <Text style={styles.buttonText}>Kembali</Text>
              </Button>
            </View>
          </View>
        )}
      </ScrollView>
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
  pickOne: {
    paddingHorizontal: 18,
    paddingVertical: 24,
    width: "100%",
    margin: "auto",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 1,
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: "#6FA39A",
    marginBottom: 18,
  },

  blueButton: {
    backgroundColor: colors.darkBlue,
    width: "100%",
    borderRadius: 12,
    height: 48,
    margin: "auto",
    marginBottom: 10,
  },
  whiteButton: {
    backgroundColor: colors.white,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  buttonText: {
    color: colors.darkBlue,
    fontSize: 16,
    fontFamily: "FiraSansMedium",
  },
  buttonTextWhite: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "FiraSansMedium",
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
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
