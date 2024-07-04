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
import { Button, ScrollView } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const manualData = [
  {
    question: "Menu Beranda",
    answer: [
      "Pada beranda aplikasi, terdapat fitur pencarian kuota permohonan paspor serta berita terkini mengenai imigrasi.",
    ],
  },
  {
    question: "Pencarian Kuota Permohonan Paspor",
    answer: [
      "1. Pilih kuota permohonan reguler atau percepatan",
      "2. Tambahkan filter seperti kota penyedia layanan, tanggal awal, dan tanggal akhir",
      "3. Klik tombol Cari Kuota Permohonan Paspor",
      "4. Hasil pencarian berupa daftar kantor imigrasi yang menyediakan layanan sesuai filter pencarian",
      "5. Pemohon dapat memilih kantor tujuan, tanggal, dan waktu kedatangan",
      "6. Pemohon dapat mengaktifkan notifikasi pembukaan kuota untuk kantor imigrasi dengan kuota permohonan yang sudah penuh",
    ],
  },
  {
    question: "Pengajuan Permohonan Paspor",
    answer: [
      "1. Setelah mencari kuota permohonan paspor, pemohon dapat mengajukan permohonan dengan mengisi formulir permohonan dan pembayaran",
      "2. Pengisian formulir permohonan dan pembayaran harus diselesaikan dalam durasi 2 jam",
      "3. Pengisian formulir terdiri atas 4 tahap yaitu:",
      "• Verifikasi NIK\n• Kuesioner Permohonan Paspor\n• Unggah Dokumen\n• Data Tambahan Pemohon",
      "4. Persiapkan dokumen di bawah untuk mempermudah proses pengisian formulir",
      "• e-KTP atau Surat Keterangan Perekaman e-KTP\n• kartu keluarga\n• akta kelahiran, akta perkawinan atau buku nikah, ijazah, atau surat baptis\n• Surat Lapor Kehilangan dari Kepolisian\n• fotokopi paspor lama (bila ada)",
    ],
  },
  {
    question: "Menu Permohonan",
    answer: [
      "Menu Riwayat menampilkan daftar riwayat permohonan yang sudah kadaluarsa dan aktif.",
      "Pada riwayat permohonan aktif, pemohon dapat melihat permohonan paspor dengan status ‘Menunggu Pembayaran’, ‘Pembayaran Berhasil’ , ‘Proses Penerbitan’, ‘Siap Diambil’, dan ‘Selesai’",
    ],
  },
  {
    question: "Menu Bantuan",
    answer: [
      "Menu Bantuan menampilkan informasi seputar M-Paspor seperti Frequently Asked Question (FAQ) dan Manual Penggunaan Aplikasi.",
    ],
  },
  {
    question: "Menu Profil",
    answer: [
      "Menu Profil menampilkan informasi akun yang digunakan untuk masuk ke dalam aplikasi.",
    ],
  },
];

const Item = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.questionContainer}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.questionText}>{item.question}</Text>
        <Ionicons
          name={expanded ? "chevron-forward" : "chevron-down"}
          size={24}
          color={colors.darkBlue}
        />
      </TouchableOpacity>
      {expanded &&
        item.answer.map((item) => (
          <Text style={styles.answerText} key={item}>
            {item}
          </Text>
        ))}
    </View>
  );
};

export default function Manual() {
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
            <Text style={styles.navbarText}>Manual Penggunaan Aplikasi</Text>
          </View>
        </View>
      </ImageBackground>
      <ScrollView style={{ paddingTop: 10, paddingHorizontal: 20 }}>
        {manualData.map((item) => (
          <Item item={item} key={item.question} />
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
    fontSize: 15,
    fontFamily: "FiraSansRegular",
  },
});
