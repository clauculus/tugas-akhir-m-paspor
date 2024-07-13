import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
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

  const [draft, setDraft] = useState({});
  const [status, setStatus] = useState("");
  const [expandedDetail, setExpandedDetail] = useState(false);
  const [expandedBukti, setExpandedBukti] = useState(false);

  const twoHoursInMillis = 2 * 60 * 60 * 1000;
  const targetTime = new Date(draft.createdAt).getTime() + twoHoursInMillis;
  const [remainingTime, setRemainingTime] = useState(
    targetTime - new Date().getTime()
  );

  const formatDateIndonesian = (date) => {
    const dateString = date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const timeString = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${dateString} ${timeString} WIB`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        const currentTime = targetTime - new Date().getTime();
        if (currentTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return currentTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const formatTime = (time) => {
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          padding: 4,
          borderRadius: 4,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.darkGreen,
            padding: 4,
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              fontFamily: "FiraSansMedium",
              color: "white",
              fontSize: 16,
            }}
          >
            {isNaN(hours.toString().padStart(2, "0"))
              ? "00"
              : hours.toString().padStart(2, "0")}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "FiraSansMedium",
            color: colors.darkGreen,
            fontSize: 16,
          }}
        >
          :
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.darkGreen,
            padding: 4,
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              fontFamily: "FiraSansMedium",
              color: "white",
              fontSize: 16,
            }}
          >
            {isNaN(minutes.toString().padStart(2, "0"))
              ? "00"
              : minutes.toString().padStart(2, "0")}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "FiraSansMedium",
            color: colors.darkGreen,
            fontSize: 16,
          }}
        >
          :
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.darkGreen,
            padding: 4,
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              fontFamily: "FiraSansMedium",
              color: "white",
              fontSize: 16,
            }}
          >
            {isNaN(seconds.toString().padStart(2, "0"))
              ? "00"
              : seconds.toString().padStart(2, "0")}
          </Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const existingDrafts = await AsyncStorage.getItem("drafts");
        const drafts = existingDrafts ? JSON.parse(existingDrafts) : [];

        if (draftId) {
          const draftIndex = drafts.findIndex((d) => d.id == draftId);
          setDraft(drafts[draftIndex]);
          setStatus(drafts[draftIndex].status);
          console.log("ini draft", draft);
        }
      } catch (error) {
        console.error("Failed to fetch the draft", error);
      }
    };

    fetchDraft();
  }, []);

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

  const getColor = (status) => {
    if (status === "Menunggu Pembayaran") {
      return colors.yellow;
    } else if (status === "Pembayaran Berhasil") {
      return colors.green;
    } else {
      return "red";
    }
  };

  const handleStepChange = (step) => {
    router.push({
      pathname: `/form/${step}`,
      params: {
        draftId,
      },
    });
  };

  const saveStepData = async (data) => {
    try {
      const existingDrafts = await AsyncStorage.getItem("drafts");
      const drafts = existingDrafts ? JSON.parse(existingDrafts) : [];
      const draftIndex = drafts.findIndex((d) => d.id == draftId);

      if (draftIndex !== -1) {
        drafts[draftIndex].status = "Pembayaran Berhasil";
        await AsyncStorage.setItem("drafts", JSON.stringify(drafts));
        setDraft(drafts[draftIndex]);
        console.log("tes");
      }
    } catch (e) {
      console.error("Failed to save step data:", e);
    }
  };

  const handleContinue = () => {
    saveStepData();
    setStatus("Pembayaran Berhasil");
    // router.push({
    //   pathname: `/form/detailPermohonanOthers`,
    //   params: {
    //     draftParams: JSON.stringify(draft),
    //   },
    // });
    // set status jadi Pembayaran berhasil
    // buat kondisi2 data yang berbeda
  };

  if (!draft) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  // console.log(draft);

  return (
    <SafeAreaView
      edges={["right", "left", "top"]}
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
            onPress={() => router.push("/home")}
          />
          <View>
            <Text style={styles.navbarText}>
              {draft.status === "Menunggu Pembayaran"
                ? "Permohonan Paspor"
                : "Detail Permohonan Paspor"}
            </Text>
          </View>
        </View>
      </ImageBackground>
      <ScrollView style={{ padding: 22 }}>
        <View style={{ flexDirection: "column", gap: 4 }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                width: "48%",
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
          {/* <Text style={styles.timerText}>{formatTime(remainingTime)}</Text> */}
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                width: "48%",
                fontSize: 16,
                color: colors.darkBlue,
                fontFamily: "FiraSansMedium",
              }}
            >
              Tanggal Kedatangan
            </Text>
            <Text style={{ fontFamily: "FiraSansRegular", fontSize: 16 }}>
              : {draft.selectedDate} Juli 2024
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                width: "48%",
                fontSize: 16,
                color: colors.darkBlue,
                fontFamily: "FiraSansMedium",
              }}
            >
              Jam Kedatangan
            </Text>
            <Text style={{ fontFamily: "FiraSansRegular", fontSize: 16 }}>
              : {draft.selectedTime} WIB
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                width: "48%",
                fontSize: 16,
                color: colors.darkBlue,
                fontFamily: "FiraSansMedium",
              }}
            >
              Tanggal Pengajuan
            </Text>
            <Text style={{ fontFamily: "FiraSansRegular", fontSize: 16 }}>
              : {formatDateIndonesian(new Date(draft.createdAt))}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                width: "48%",
                fontSize: 16,
                color: colors.darkBlue,
                fontFamily: "FiraSansMedium",
              }}
            >
              Status
            </Text>
            <View
              style={{
                fontFamily: "FiraSansRegular",
                fontSize: 16,
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Text style={{ fontFamily: "FiraSansRegular", fontSize: 16 }}>
                :{" "}
              </Text>
              <View
                style={{
                  backgroundColor: getColor(draft.status),
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "FiraSansMedium",
                    fontSize: 14,
                  }}
                >
                  {draft.status}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {status === "Menunggu Pembayaran" && (
          <View>
            <View
              style={{
                backgroundColor: "#CAFFCA",
                marginVertical: 10,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "FiraSansRegular",
                  color: colors.darkGreen,
                }}
              >
                Selesaikan dalam
              </Text>
              <Text style={{ fontFamily: "FiraSansMedium", fontSize: 17 }}>
                {formatTime(remainingTime)}
              </Text>
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
                Waktu yang tertera di atas merupakan sisa waktu untuk mengisi
                data pemohon dan melakukan pembayaran.
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
                  onPress={() => handleStepChange("step2")}
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
                  onPress={() => handleStepChange("step3")}
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
                  onPress={() => handleStepChange("step4")}
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
              <Button style={styles.blueButton} onPress={handleContinue}>
                <Text style={styles.buttonTextWhite}>Lanjut</Text>
              </Button>
            </View>
          </View>
        )}
        {status !== "Menunggu Pembayaran" && (
          <View style={{ paddingVertical: 0 }}>
            <View
              style={{
                backgroundColor: "#E8F7F5",
                borderRadius: 18,
                padding: 20,
                marginVertical: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <Ionicons name="alert-circle" color="red" size={24} />
                <Text style={{ fontFamily: "FiraSansMedium", fontSize: 15 }}>
                  Mohon bawa dokumen persyaratan permohonan paspor berikut:
                </Text>
              </View>
              <Text style={{ fontFamily: "FiraSansRegular" }}>
                {"\u2022"} KTP asli dan fotokopi{"\n"}
                {"\u2022"} KK asli dan fotokopi{"\n"}
                {"\u2022"} Akta kelahiran/Akta perkawinan/buku
                nikah/ijazah/surat baptis
                {"\n"}
                {"\u2022"} Paspor lama {"\n"}
                {"\u2022"} Paspor lama
              </Text>
            </View>
            <View style={styles.item}>
              <TouchableOpacity
                style={styles.questionContainer}
                onPress={() => setExpandedDetail(!expandedDetail)}
              >
                <Text style={styles.questionText}>Detail Pemohon</Text>
                <Ionicons
                  name={expandedDetail ? "chevron-forward" : "chevron-down"}
                  size={24}
                  color={colors.darkBlue}
                />
              </TouchableOpacity>
              {expandedDetail && (
                <View
                  style={{
                    backgroundColor: "white",
                    shadowColor: "#000",
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.25,
                    shadowRadius: 6,
                    elevation: 1,
                    borderRadius: 18,
                    padding: 23,
                    borderWidth: 0.5,
                    borderColor: "#6FA39A",
                    gap: 6,
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: colors.darkBlue,
                      fontFamily: "FiraSansMedium",
                      marginBottom: 8,
                    }}
                  >
                    {draft.step1.nama}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        width: "36%",
                        fontSize: 14,
                        color: colors.darkBlue,
                        fontFamily: "FiraSansMedium",
                      }}
                    >
                      NIK
                    </Text>
                    <Text
                      style={{ fontFamily: "FiraSansRegular", fontSize: 14 }}
                    >
                      : {draft.step1.NIK}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        width: "36%",
                        fontSize: 14,
                        color: colors.darkBlue,
                        fontFamily: "FiraSansMedium",
                      }}
                    >
                      Jenis Kelamin
                    </Text>
                    <Text
                      style={{ fontFamily: "FiraSansRegular", fontSize: 14 }}
                    >
                      : {draft.step1.jenisKelamin}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        width: "36%",
                        fontSize: 14,
                        color: colors.darkBlue,
                        fontFamily: "FiraSansMedium",
                      }}
                    >
                      Jenis Permohonan
                    </Text>
                    <Text
                      style={{ fontFamily: "FiraSansRegular", fontSize: 14 }}
                    >
                      :{" "}
                      {draft.jenisPermohonan == "reguler"
                        ? "Reguler"
                        : "Percepatan"}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        width: "36%",
                        fontSize: 14,
                        color: colors.darkBlue,
                        fontFamily: "FiraSansMedium",
                      }}
                    >
                      Jenis Paspor
                    </Text>
                    <Text
                      style={{ fontFamily: "FiraSansRegular", fontSize: 14 }}
                    >
                      : {draft.jenisPaspor}
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.item}>
              <TouchableOpacity
                style={styles.questionContainer}
                onPress={() => setExpandedBukti(!expandedBukti)}
              >
                <Text style={styles.questionText}>Bukti Pendaftaran</Text>
                <Ionicons
                  name={expandedBukti ? "chevron-forward" : "chevron-down"}
                  size={24}
                  color={colors.darkBlue}
                />
              </TouchableOpacity>
              {expandedBukti && (
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    margin: "auto",
                    paddingBottom: 20,
                    paddingTop: 30,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "FiraSansMedium",
                      // color: colors.darkBlue,
                      fontSize: 16,
                      textAlign: "center",
                      marginBottom: 10,
                    }}
                  >
                    Bukti pendaftaran M-Paspor dapat ditunjukkan kepada Kantor
                    Imigrasi/Unit Layanan Paspor
                  </Text>
                  <Image
                    source={require("../../assets/images/qr.png")}
                    style={{
                      margin: "auto",
                    }}
                  />
                </View>
              )}
            </View>
            <Button style={styles.blueButton}>
              <Text style={styles.buttonTextWhite}>
                Download Surat Pengantar Menuju Kanim
              </Text>
            </Button>
          </View>
        )}
      </ScrollView>
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
    fontSize: 20,
    marginLeft: 10,
    fontFamily: "FiraSansMedium",
  },
  blueButton: {
    marginTop: 20,
    backgroundColor: colors.darkBlue,
    width: "100%",
    borderRadius: 12,
    height: 48,
    margin: "auto",
    marginBottom: 50,
  },
  buttonTextWhite: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "FiraSansMedium",
  },
  item: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingTop: 10,
    paddingBottom: 20,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionText: {
    fontSize: 18,
    fontFamily: "FiraSansMedium",
    color: colors.darkBlue,
  },
  buttonText: {
    fontSize: 18,
  },
  answerText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "FiraSansRegular",
  },
});
