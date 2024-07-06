import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { colors } from "./theme";
import { Button, ScrollView } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const faqData = [
  {
    index: 0,
    question: "Pembukaan Kuota Permohonan Paspor di Kantor Imigrasi Bandung",
    answer: (
      <Text>
        Kuota permohonan paspor di Kantor Imigrasi Bandung akan dibuka pada{" "}
        <Text style={{ fontFamily: "FiraSansMedium" }}>
          Rabu, 3 April 2024 09.00 WIB.
        </Text>
      </Text>
    ),
    date: "23 Juni 2024 10.00 WIB",
    fullText: (
      <View>
        <Text style={{ fontFamily: "FiraSansRegular", fontSize: 15 }}>
          Kuota permohonan paspor di Kantor Imigrasi Bandung akan dibuka pada{" "}
          <Text style={{ fontFamily: "FiraSansMedium" }}>
            Rabu, 3 April 2024 09.00 WIB.
          </Text>
        </Text>
        <Text
          style={{ marginTop: 8, fontFamily: "FiraSansRegular", fontSize: 15 }}
        >
          Mohon persiapkan dokumen-dokumen di bawah untuk mempermudah proses
          pendaftaran.
          {"\u2022"} Kartu Tanda Penduduk{"\n"}
          {"\u2022"} Kartu Keluarga{"\n"}
          {"\u2022"} Akta Kelahiran/Akta Perkawinan/Buku Nikah/Ijazah/Surat
          Baptis
          {"\n"}
          {"\u2022"} Paspor Lama (jika ada)
        </Text>
      </View>
    ),
    isOpened: false,
  },
  {
    index: 1,
    question: "Hari Penjadwalan di Kantor Imigrasi Bandung",
    answer: (
      <Text>
        Hari ini adalah jadwal kunjungan Anda ke Kantor Imigrasi Bandung pada
        sesi{" "}
        <Text style={{ fontFamily: "FiraSansMedium" }}>
          Rabu, 3 April 2024 09.00 WIB.
        </Text>
      </Text>
    ),
    date: "15 Juni 2024 13.00 WIB",
    fullText: (
      <View>
        <Text
          style={{ fontFamily: "FiraSansRegular", fontSize: 15, marginTop: 8 }}
        >
          Hari ini adalah jadwal kunjungan Anda ke Kantor Imigrasi Bandung pada
          sesi{" "}
          <Text style={{ fontFamily: "FiraSansMedium" }}>
            Rabu, 3 April 2024 09.00 WIB.
          </Text>
        </Text>
        <Text
          style={{ fontFamily: "FiraSansRegular", fontSize: 15, marginTop: 8 }}
        >
          Mohon persiapkan dokumen yang perlu dibawa ke kantor imigrasi pada
          detail permohonan.
        </Text>
      </View>
    ),
    isOpened: true,
  },
  {
    index: 2,
    question: "Pembayaran Sukses!",
    answer: (
      <Text>
        Anda berhasil melakukan pembayaran untuk pemohon atas nama Jojo pada{" "}
        <Text style={{ fontFamily: "FiraSansMedium" }}>
          Rabu, 3 April 2024 09.00 WIB.
        </Text>
      </Text>
    ),
    date: "22 Juni 2024 10.00 WIB",
    fullText: (
      <View>
        <Text style={{ fontFamily: "FiraSansRegular", fontSize: 15 }}>
          Anda berhasil melakukan pembayaran untuk pemohon atas nama Jojo pada{" "}
          <Text style={{ fontFamily: "FiraSansMedium" }}>
            Rabu, 3 April 2024 09.00 WIB.
          </Text>
        </Text>
        <Text
          style={{ fontFamily: "FiraSansRegular", fontSize: 15, marginTop: 8 }}
        >
          Mohon persiapkan dokumen yang perlu dibawa ke kantor imigrasi pada
          detail permohonan.
        </Text>
      </View>
    ),
    isOpened: true,
  },
  {
    index: 3,
    question: "Permohonan Paspor Sukses!",
    answer: (
      <Text style={{ fontFamily: "FiraSansRegular", fontSize: 15 }}>
        Silakan melakukan pembayaran sebelum{" "}
        <Text style={{ fontFamily: "FiraSansMedium" }}>
          Rabu, 3 April 2024 09.00 WIB.
        </Text>
      </Text>
    ),
    date: "21 Juni 2024 11.00 WIB",
    fullText: (
      <View>
        <Text style={{ fontFamily: "FiraSansRegular", fontSize: 15 }}>
          Silakan melakukan pembayaran sebelum{" "}
          <Text style={{ fontFamily: "FiraSansMedium" }}>
            Rabu, 3 April 2024 09.00 WIB.
          </Text>
        </Text>
        <Text
          style={{ fontFamily: "FiraSansRegular", fontSize: 15, marginTop: 8 }}
        >
          Jika Anda tidak melakukan pembayaran sebelum tenggat waktu, maka
          permohonan Anda akan secara otomatis dibatalkan oleh sistem.
        </Text>
      </View>
    ),
    isOpened: true,
  },
];

const NotificationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        router.push({
          pathname: "/detailNotification",
          params: { index: item.index },
        })
      }
    >
      <View
        style={{
          // marginBottom: 10,
          // backgroundColor: "pink",
          paddingVertical: 18,
          paddingHorizontal: 30,
          borderBottomWidth: 1,
          borderColor: "#E8E8E8",
          backgroundColor: item.isOpened ? "white" : "#E8F7F5",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "FiraSansSemiBold",
              fontSize: 17,
              color: colors.darkBlue,
              marginBottom: 4,
              width: "85%",
              // backgroundColor: "pink",
            }}
          >
            {item.question}
          </Text>
          <Ionicons name="chevron-forward" size={24} color={colors.darkBlue} />
        </View>
        <Text
          style={{
            fontFamily: "FiraSansRegular",
            fontSize: 15,
            color: "black",
            marginTop: 6,
            marginBottom: 6,
          }}
        >
          {item.answer}
        </Text>
        <Text
          style={{
            fontFamily: "FiraSansRegular",
            color: colors.inactive,
            marginTop: 4,
          }}
        >
          {item.date}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function Notification() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        height: "100%",
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("../assets/images/gradient-bg.png")}
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
            <Text style={styles.navbarText}>Notifikasi</Text>
          </View>
        </View>
      </ImageBackground>
      <ScrollView style={{ paddingTop: 0, paddingHorizontal: 0 }}>
        {faqData.map((item) => (
          <NotificationItem item={item} key={item.question} />
        ))}
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
    fontFamily: "FiraSansMedium",
    fontSize: 20,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
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
