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
import { Button, Radio, Select } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { ProgressBar, MD3Colors } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Step2() {
  const router = useRouter();

  const [sudahMemilikiPaspor, setSudahMemilikiPaspor] = useState("");
  const [tujuanMembuat, setTujuanMembuat] = useState("");
  const [rencanaTinggal, setRencanaTinggal] = useState("");
  const [namaKerabatInd, setNamaKerabatInd] = useState("");
  const [nomorTeleponKerabatInd, setNomorTeleponKerabatInd] = useState("");
  const [keteranganHubunganKerabatInd, setKeteranganHubunganKerabatInd] =
    useState("");
  const [negaraTujuan, setNegaraTujuan] = useState("");
  const [tempatTinggalTujuan, setTempatTinggalTujuan] = useState("");
  const [namaKerabatTujuan, setNamaKerabatTujuan] = useState("");
  const [nomorTeleponTujuan, setNomorTeleponTujuan] = useState("");
  const [keteranganHubunganTujuan, setKeteranganHubunganTujuan] = useState("");

  const [substep, setSubstep] = useState(1);
  const { draftId, draftParams } = useLocalSearchParams();
  const [draft, setDraft] = useState({});

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
          // const currentDraft = drafts.find((d) => {
          //   d.id === +draftId;
          //   setDraft(d);
          // });
          console.log("tes", drafts[draftIndex]);
          //   console.log(draftId);
          //   console.log(currentDraft);
          //   if (currentDraft) {
          //     setDraft(currentDraft);
          //     if (currentDraft.step2) {
          //       setSudahMemilikiPaspor(
          //         currentDraft.step2.sudahMemilikiPaspor || ""
          //       );
          //       setTujuanMembuat(currentDraft.step2.tujuanMembuat || "");
          //       setRencanaTinggal(currentDraft.step2.rencanaTinggal || "");
          //       setNamaKerabatIndonesia(
          //         currentDraft.step2.namaKerabatIndonesia || ""
          //       );
          //       setNomorTeleponKerabatIndonesia(
          //         currentDraft.step2.nomorTeleponKerabatIndonesia || ""
          //       );
          //       setKeteranganHubunganKerabatIndonesia(
          //         currentDraft.step2.keteranganHubunganKerabatIndonesia || ""
          //       );
          //       setNegaraTujuan(currentDraft.step2.negaraTujuan || "");
          //       setTempatTinggalTujuan(
          //         currentDraft.step2.tempatTinggalTujuan || ""
          //       );
          //       setNamaKerabatTujuan(currentDraft.step2.namaKerabatTujuan || "");
          //       setNomorTeleponTujuan(
          //         currentDraft.step2.nomorTeleponTujuan || ""
          //       );
          //       setKeteranganHubunganTujuan(
          //         currentDraft.step2.keteranganHubunganTujuan || ""
          //       );
          //     }
          //   }
          // }

          if (draft.step2) {
            setSudahMemilikiPaspor(draft.step2.sudahMemilikiPaspor || "");
            setTujuanMembuat(draft.step2.tujuanMembuat || "");
            setRencanaTinggal(draft.step2.rencanaTinggal || "");
            setNamaKerabatInd(draft.step2.namaKerabatInd || "");
            setNomorTeleponKerabatInd(draft.step2.nomorTeleponKerabatInd || "");
            setKeteranganHubunganKerabatInd(
              draft.step2.keteranganHubunganKerabatInd || ""
            );
            setNegaraTujuan(draft.step2.negaraTujuan || "");
            setTempatTinggalTujuan(draft.step2.tempatTinggalTujuan || "");
            setNamaKerabatTujuan(draft.step2.namaKerabatTujuan || "");
            setNomorTeleponTujuan(draft.step2.nomorTeleponTujuan || "");
            setKeteranganHubunganTujuan(
              draft.step2.keteranganHubunganTujuan || ""
            );
          }
        }
      } catch (error) {
        console.error("Failed to fetch the draft", error);
      } finally {
        setLoading(false);
        console.log(draft);
      }
    };
    fetchDraft();
    console.log(sudahMemilikiPaspor);
  }, [draftId, substep]);

  const saveStepData = async (data) => {
    try {
      const existingDrafts = await AsyncStorage.getItem("drafts");
      const drafts = existingDrafts ? JSON.parse(existingDrafts) : [];
      const draftIndex = drafts.findIndex((d) => d.id == draftId);
      console.log("draftIndex", draftIndex);
      if (draftIndex !== -1) {
        drafts[draftIndex].step2 = { ...drafts[draftIndex].step2, ...data };
        await AsyncStorage.setItem("drafts", JSON.stringify(drafts));
        setDraft(drafts[draftIndex]);
      }
    } catch (e) {
      console.error("Failed to save step data:", e);
    }
  };

  const handleContinue = () => {
    console.log(
      namaKerabatInd,
      nomorTeleponKerabatInd,
      keteranganHubunganKerabatInd
    );
    saveStepData({
      sudahMemilikiPaspor,
      tujuanMembuat,
      rencanaTinggal,
      namaKerabatInd,
      nomorTeleponKerabatInd,
      keteranganHubunganKerabatInd,
      negaraTujuan,
      tempatTinggalTujuan,
      namaKerabatTujuan,
      nomorTeleponTujuan,
      keteranganHubunganTujuan,

      substep,
    });
    if (substep !== 5) {
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
      return "Pertanyaan 1";
    } else if (substep == 2) {
      return "Pertanyaan 2";
    } else if (substep == 3) {
      return "Pertanyaan 3";
    } else if (substep == 4) {
      return "Pertanyaan 4";
    } else {
      return "Pertanyaan 5";
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
            <Text style={styles.navbarText}>Kuesioner Permohonan Paspor</Text>
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
                progress={substep / 5}
                color={colors.green}
                style={{ borderRadius: 10, height: 10 }}
              />
            </View>
            <Text style={{ fontFamily: "FiraSansRegular", color: "black" }}>
              {substep}/5 Langkah
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
                Apakah anda sudah pernah memiliki paspor?
                <Text style={{ color: "red" }}> *</Text>
              </Text>
              <Radio.Group
                name="myRadioGroup"
                value={sudahMemilikiPaspor}
                onChange={(e) => setSudahMemilikiPaspor(e)}
              >
                <View style={styles.pickOne}>
                  <Radio value="belum" my="1" size="sm">
                    <View style={{ flexDirection: "column", marginLeft: 8 }}>
                      <Text
                        style={{
                          fontFamily: "FiraSansRegular",
                          fontSize: 16,
                          color: colors.darkBlue,
                        }}
                      >
                        Belum
                      </Text>
                      <Text
                        style={{
                          fontFamily: "FiraSansRegular",
                          fontSize: 13,
                          color: colors.darkBlue,
                          fontStyle: "italic",
                          width: "53%",
                        }}
                      >
                        Belum pernah memiliki paspor atau belum pernah
                        mengajukan permohonan paspor
                      </Text>
                    </View>
                  </Radio>
                </View>
                <View style={styles.pickOne}>
                  <Radio value="sudah" my="1" size="sm">
                    <Text
                      style={{
                        fontFamily: "FiraSansRegular",
                        fontSize: 15,
                        color: colors.darkBlue,
                        marginLeft: 8,
                      }}
                    >
                      Sudah
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
                  Lanjut
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
              <Text
                style={{
                  fontFamily: "FiraSansMedium",
                  fontSize: 22,
                  marginBottom: 20,
                }}
              >
                Apakah tujuan anda {"\n"}membuat paspor?
                <Text style={{ color: "red" }}> *</Text>
              </Text>
              <Radio.Group
                name="myRadioGroup"
                value={tujuanMembuat}
                onChange={(e) => setTujuanMembuat(e)}
              >
                {tujuanMembuatOptions.map((option) => (
                  <View style={styles.pickOne} key={option.value}>
                    <Radio value={option.value} my="1" size="sm">
                      <Text
                        style={{
                          fontFamily: "FiraSansRegular",
                          fontSize: 15,
                          color: colors.darkBlue,
                          marginLeft: 8,
                        }}
                      >
                        {option.label}
                      </Text>
                    </Radio>
                  </View>
                ))}
              </Radio.Group>
            </View>
            <View style={{ flex: 1, marginTop: 20, marginBottom: 30 }}>
              <Button style={styles.blueButton} onPress={handleContinue}>
                <Text style={styles.buttonTextWhite}>Lanjut</Text>
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
                Berapa lama rencana tinggal di luar negeri?
                <Text style={{ color: "red" }}> *</Text>
              </Text>
              <Radio.Group
                name="myRadioGroup"
                value={rencanaTinggal}
                onChange={(e) => setRencanaTinggal(e)}
              >
                {rencanaTinggalOptions.map((option) => (
                  <View style={styles.pickOne} key={option.value}>
                    <Radio value={option.value} my="1" size="sm">
                      <Text
                        style={{
                          fontFamily: "FiraSansRegular",
                          fontSize: 15,
                          color: colors.darkBlue,
                          marginLeft: 8,
                        }}
                      >
                        {option.label}
                      </Text>
                    </Radio>
                  </View>
                ))}
              </Radio.Group>
            </View>
            <View style={{ flex: 1, marginTop: 20, marginBottom: 30 }}>
              <Button style={styles.blueButton} onPress={handleContinue}>
                <Text style={styles.buttonTextWhite}>Lanjut</Text>
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
              <Text
                style={{
                  fontFamily: "FiraSansMedium",
                  fontSize: 22,
                  marginBottom: 20,
                }}
              >
                Nomor telepon keluarga/kerabat terdekat Anda di Indonesia yang
                dapat dihubungi?
                <Text style={{ color: "red" }}> *</Text>
              </Text>
              <View style={styles.formGroup}>
                <Text style={styles.textForm}>
                  Nama Kerabat <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={namaKerabatInd}
                  onChangeText={setNamaKerabatInd}
                  placeholder="Nama"
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.textForm}>
                  Nomor Telepon <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={nomorTeleponKerabatInd}
                  onChangeText={setNomorTeleponKerabatInd}
                  placeholder="Nama"
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.textForm}>
                  Keterangan Hubungan Keluarga{" "}
                  <Text style={{ color: "red" }}>*</Text>
                </Text>
                <Select
                  placeholder="Pilih salah satu"
                  selectedValue={keteranganHubunganKerabatInd}
                  width="full"
                  fontSize={15}
                  paddingHorizontal={10}
                  height={50}
                  borderRadius={10}
                  onValueChange={setKeteranganHubunganKerabatInd}
                >
                  {hubunganKeluargaOptions.map((province) => (
                    <Select.Item
                      key={province.value}
                      label={province.label}
                      value={province.value}
                    />
                  ))}
                </Select>
              </View>
            </View>
            <View style={{ flex: 1, marginTop: 20, marginBottom: 30 }}>
              <Button style={styles.blueButton} onPress={handleContinue}>
                <Text style={styles.buttonTextWhite}>Lanjut</Text>
              </Button>
              <Button onPress={() => setSubstep(3)} style={styles.whiteButton}>
                <Text style={styles.buttonText}>Kembali</Text>
              </Button>
            </View>
          </View>
        )}
        {substep == 5 && (
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
                <Text
                  style={{
                    fontFamily: "FiraSansMedium",
                    fontSize: 22,
                  }}
                >
                  Negara mana yang akan anda tuju?
                </Text>
                <Text
                  style={{
                    color: colors.darkBlue,
                    fontFamily: "FiraSansRegular",
                    marginBottom: 20,
                  }}
                >
                  (Opsional)
                </Text>

                <Select
                  placeholder="Pilih Provinsi"
                  selectedValue={negaraTujuan}
                  width="full"
                  fontSize={15}
                  paddingHorizontal={10}
                  height={50}
                  borderRadius={10}
                  onValueChange={setNegaraTujuan}
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
              <View>
                <Text
                  style={{
                    fontFamily: "FiraSansMedium",
                    fontSize: 22,
                  }}
                >
                  Di mana tempat tinggal di tujuan?
                </Text>
                <Text
                  style={{
                    color: colors.darkBlue,
                    fontFamily: "FiraSansRegular",
                    marginBottom: 20,
                  }}
                >
                  (Opsional)
                </Text>
                <TextInput
                  style={styles.input}
                  value={tempatTinggalTujuan}
                  onChangeText={setTempatTinggalTujuan}
                  placeholder="Nama"
                />
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "FiraSansMedium",
                    fontSize: 22,
                  }}
                >
                  Nomor telepon keluarga/kerabat di negara tujuan?
                </Text>
                <Text
                  style={{
                    color: colors.darkBlue,
                    fontFamily: "FiraSansRegular",
                    marginBottom: 20,
                  }}
                >
                  (Opsional)
                </Text>
                <View style={styles.formGroup}>
                  <Text style={styles.textForm}>Nama Kerabat</Text>
                  <TextInput
                    style={styles.input}
                    value={namaKerabatTujuan}
                    onChangeText={setNamaKerabatTujuan}
                    placeholder="Nama"
                  />
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.textForm}>Nomor Telepon</Text>
                  <TextInput
                    style={styles.input}
                    value={nomorTeleponTujuan}
                    onChangeText={setNomorTeleponTujuan}
                    placeholder="Nomor Telepon"
                  />
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.textForm}>
                    Keterangan Hubungan Keluarga{" "}
                  </Text>
                  <Select
                    placeholder="Pilih Salah satu"
                    selectedValue={keteranganHubunganTujuan}
                    width="full"
                    fontSize={15}
                    paddingHorizontal={10}
                    height={50}
                    borderRadius={10}
                    onValueChange={setKeteranganHubunganTujuan}
                  >
                    {hubunganKeluargaOptions.map((province) => (
                      <Select.Item
                        key={province.value}
                        label={province.label}
                        value={province.value}
                      />
                    ))}
                  </Select>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, marginTop: 20, marginBottom: 30 }}>
              <Button style={styles.blueButton} onPress={handleContinue}>
                <Text style={styles.buttonTextWhite}>Lanjut</Text>
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
