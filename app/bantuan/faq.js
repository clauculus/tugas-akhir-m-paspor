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
const faqData = [
  {
    question:
      "Apa perbedaan paspor biasa, paspor elektronik, dan paspor polikarbonat?",
    answer:
      "Paspor biasa: Merupakan paspor konvensional yang hanya berisi data identitas pemegangnya dalam bentuk cetak. Paspor elektronik (e-passport): Paspor ini memiliki chip elektronik yang menyimpan data biometrik pemegangnya, seperti sidik jari dan foto wajah, sehingga lebih aman dan sulit untuk dipalsukan. Paspor polikarbonat: Paspor ini memiliki halaman identitas yang terbuat dari bahan polikarbonat, menjadikannya lebih tahan lama dan aman dari pemalsuan karena data dicetak secara laser pada bahan tersebut.",
  },
  {
    question: "Kapan kuota permohonan paspor dibuka?",
    answer:
      "Kuota permohonan paspor biasanya dibuka pada waktu-waktu tertentu yang berbeda di setiap kantor imigrasi. Informasi mengenai pembukaan kuota dapat dipantau melalui aplikasi M-Paspor dengan mengaktifkan notifikasi pembukaan kuota atau melalui media sosial kantor imigrasi setempat.",
  },
  {
    question: "Mengapa kuota permohonan paspor selalu habis?",
    answer:
      "Kuota permohonan paspor seringkali habis karena tingginya permintaan dari masyarakat. Oleh karena itu, disarankan untuk selalu memantau situs resmi layanan paspor agar dapat segera melakukan pemesanan ketika kuota dibuka.",
  },
  {
    question:
      "Apabila saya membutuhkan paspor dalam waktu yang cepat, apakah bisa?",
    answer:
      "Pada umumnya, paspor akan selesai dalam waktu 4-6 hari kerja. Jika Anda membutuhkan paspor dalam waktu yang cepat, Anda bisa mengajukan permohonan paspor percepatan dengan biaya tambahan Rp1.000.000, paspor akan selesai dalam waktu 1 hari kerja.",
  },
  {
    question:
      "Apabila saja dokumen yang diperlukan untuk melakukan permohonan paspor?",
    answer:
      "Dokumen yang diperlukan untuk melakukan permohonan paspor meliputi KTP, Kartu Keluarga, Akta Kelahiran atau Ijazah, serta paspor lama jika ada.",
  },
  {
    question: "Bagaimana cara memeriksa status permohonan paspor saya?",
    answer:
      "Anda dapat memeriksa status permohonan paspor melalui bagian permohonan aktif pada aplikasi ini. Status permohonan paspor akan selalu diperbaharui sehingga Anda dapat mengetahui status terkini dari proses pembuatan paspor Anda.",
  },
  {
    question: "Bagaimana cara mengambil paspor yang sudah selesai?",
    answer:
      "Untuk mengambil paspor yang sudah selesai, Anda perlu datang ke kantor imigrasi tempat Anda mengajukan permohonan dengan membawa tanda terima atau bukti permohonan dan identitas diri. Status permohonan paspor akan berubah menjadi Siap Diambil jika paspor sudah dapat diambil.",
  },
];

const FAQItem = ({ item }) => {
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
      {expanded && <Text style={styles.answerText}>{item.answer}</Text>}
    </View>
  );
};

export default function FAQ() {
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
            <Text style={styles.navbarText}>FAQ</Text>
          </View>
        </View>
      </ImageBackground>
      <ScrollView style={{ paddingTop: 10, paddingHorizontal: 20 }}>
        {faqData.map((item) => (
          <FAQItem item={item} key={item.question} />
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
