import { View, Text, Image, TextInput } from "react-native";
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
    >
      <Ionicons
        name="chevron-back"
        color={colors.darkBlue}
        size={26}
        onPress={() => router.back()}
      />
      <Text>{detailLokasi.lokasi.nama}</Text>
      <Text>{detailLokasi.lokasi.jarak}</Text>
      <CustomCalendar
        startDate={startDate}
        endDate={endDate}
        locationArray={detailLokasi.lokasi}
        monthNumber={3}
        onDayPress={handleDayPress}
      />
      {selectedDate && (
        <Select
          placeholder="Pilih kota"
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
      )}
      <Button
        onPress={() =>
          router.push({
            pathname: "/lokasi/rangkumJadwal",
            params: {
              lokasi: lokasi,
              selectedDate: selectedDate,
              selectedTime: selectedTime,
            },
          })
        }
      >
        Lanjut
      </Button>
    </SafeAreaView>
  );
}
