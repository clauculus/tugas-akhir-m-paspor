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
import { useEffect, useState } from "react";
import { colors } from "./../theme";
import { Button, Select } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import CustomCalendar from "../../components/CustomCalendar";

export default function PilihJadwal() {
  const startDate = "1";
  const endDate = "31";
  const router = useRouter();
  const { lokasi, jenisPermohonan } = useLocalSearchParams();
  const detailLokasi = JSON.parse(lokasi);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);

  console.log("ini", selectedDate);

  const handleDayPress = (date, times) => {
    setSelectedDate(date);
    setAvailableTimes(times);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  console.log(jenisPermohonan);
  console.log("kirim", detailLokasi.lokasi);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        height: "100%",
        flex: 1,
      }}
      edges={["right", "left", "top"]}
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
      <ScrollView style={{ padding: 15 }}>
        <Text
          style={{
            fontFamily: "FiraSansMedium",
            fontSize: 28,
            textAlign: "center",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          Juli 2024
        </Text>
        {/* <Text>{detailLokasi.lokasi.nama}</Text>
      <Text>{detailLokasi.lokasi.jarak}</Text> */}
        <CustomCalendar
          startDate={startDate}
          endDate={endDate}
          locationArray={detailLokasi.lokasi}
          monthNumber={7}
          onDayPress={handleDayPress}
        />
        <View>
          <Text
            style={{
              color: colors.inactive,
              marginLeft: 8,
              fontSize: 16,
              fontFamily: "FiraSansMedium",
              marginBottom: 8,
            }}
          >
            Keterangan
          </Text>
          <View style={{ flexDirection: "row", gap: 30, marginLeft: 10 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: "#CAFFCA",
                  borderRadius: 8,
                }}
              ></View>
              <Text style={{ fontFamily: "FiraSansRegular" }}>
                Kuota tersedia
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: "#FFBE69",
                  borderRadius: 8,
                }}
              ></View>
              <Text style={{ fontFamily: "FiraSansRegular" }}>
                Tanggal terpilih
              </Text>
            </View>
          </View>
        </View>
        {selectedDate && (
          <View style={{ marginVertical: 10 }}>
            <Text style={styles.textForm}>
              Waktu Kedatangan <Text style={{ color: "red" }}>*</Text>
            </Text>
            <Select
              placeholder="Pilih waktu"
              selectedValue={selectedTime}
              width="full"
              fontSize={15}
              paddingHorizontal={10}
              height={50}
              borderRadius={10}
              onValueChange={(e) => setSelectedTime(e)}
            >
              {availableTimes.map((times) => (
                <Select.Item key={times} label={times} value={times} />
              ))}
            </Select>
          </View>
        )}
        <Text
          style={{
            fontFamily: "FiraSansRegular",
            fontSize: 13,
            color: colors.inactive,
            marginTop: 10,
            marginBottom: 20,
            paddingHorizontal: 5,
          }}
        >
          1. Mohon anda memastikan kehadiran anda pada tanggal terpilih {"\n"}
          2.Anda dapat melakukan ubah jadwal sebanyak 1 kali paling lambat H-1
          sebelum tanggal kedatangan {"\n"}3. Apabila anda tidak hadir pada
          tanggal kedatangan dan tidak melakukan ubah jadwal, permohonan anda
          dinyatakan batal dan pembayaran tidak dapat dikembalikan
        </Text>
        <Button
          onPress={() =>
            router.push({
              pathname: "/lokasi/rangkumJadwal",
              params: {
                lokasi: lokasi,
                selectedDate: selectedDate,
                selectedTime: selectedTime,
                jenisPermohonan: jenisPermohonan,
              },
            })
          }
          style={{
            backgroundColor: colors.darkBlue,
            width: "100%",
            borderRadius: 12,
            height: 48,
            margin: "auto",
            marginBottom: 50,
          }}
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
    flexDirection: "row",
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
});
