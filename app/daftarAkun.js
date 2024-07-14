import { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Button, Select } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { colors } from "./theme";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function DaftarAkun() {
  const router = useRouter();
  const [tanggalLahir, setTanggalLahir] = useState(new Date());

  const [isSelected, setSelection] = useState(false);
  const [phone, setPhone] = useState("");
  const [nama, setNama] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [email, setEmail] = useState("");

  const [routes] = useState([
    { key: "first", title: "Nomor Telepon" },
    { key: "second", title: "Email" },
  ]);

  const handleLogin = () => {
    console.log("Logging in with", phone);
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setTanggalLahir(date);
    hideDatePicker();
  };

  const genderOptions = [
    { label: "Laki-laki", value: "Laki-laki" },
    { label: "Perempuan", value: "Perempuan" },
  ];
  return (
    <SafeAreaView
      style={
        {
          // backgroundColor: "#00385F",
        }
      }
    >
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/cover-login.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.overlay}>
            {/* <View
              style={{
                flexDirection: "row",
                padding: 10,
              }}
            >
              <Image
                source={require("../assets/images/pengayoman-logo.png")}
                style={{
                  marginHorizontal: 10,
                }}
              />
              <Image
                source={require("../assets/images/imigrasi-logo.png")}
                style={{
                  marginHorizontal: 10,
                }}
              />
            </View> */}
            <Text
              style={{
                color: "white",
                fontSize: 28,
                textAlign: "center",
                fontFamily: "FiraSansSemiBold",
              }}
            >
              Pendaftaran Akun
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.bottomContainer}>
          {/* <Text
            style={{
              paddingTop: 24,
              textAlign: "center",
              color: "white",
              marginBottom: 44,
              fontFamily: "FiraSansRegular",
            }}
          >
            ©️ 2024 Direktorat Jenderal Imigrasi Republik Indonesia
          </Text> */}
        </View>
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.textForm}>
              Nama Lengkap <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={nama}
              onChangeText={setNama}
              placeholder="CHARLIZE CAVENDISH"
              // keyboardType="numeric"
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.textForm}>
              Tanggal Lahir <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TouchableOpacity
              onPress={showDatePicker}
              style={styles.datePicker}
            >
              <Text style={styles.dateText}>
                {tanggalLahir && tanggalLahir.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.textForm}>
              Jenis Kelamin <Text style={{ color: "red" }}>*</Text>
            </Text>
            <Select
              placeholder="Pilih Jenis Kelamin"
              // selectedValue={jenisKelamin}
              width="full"
              fontSize={15}
              paddingHorizontal={10}
              height={50}
              borderRadius={10}
              // onValueChange={setJenisKelamin}
            >
              {genderOptions.map((gender) => (
                <Select.Item
                  key={gender.value}
                  label={gender.label}
                  value={gender.value}
                />
              ))}
            </Select>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.textForm}>
              Alamat Email <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="EMAIL@ABC.COM"
              // keyboardType="numeric"
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.textForm}>
              Nomor Telepon <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="CHARLIZE CAVENDISH"
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <Checkbox value={isSelected} onValueChange={setSelection} />

            <Text
              style={{
                fontFamily: "FiraSansRegular",
                fontSize: 14,
                color: colors.darkBlue,
                // width: "80%",
              }}
            >
              Saya setuju dengan Syarat & Ketentuan
            </Text>
          </View>
          <Button
            // onPress={handleLogin}
            style={{
              backgroundColor: colors.darkBlue,
              width: "100%",
              height: 48,
              borderRadius: 12,
            }}
            onPress={() => router.push("/")}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "FiraSansMedium",
              }}
            >
              Buat Akun
            </Text>
          </Button>

          <Text
            style={{
              color: colors.inactive,
              fontSize: 16,
              fontFamily: "FiraSansRegular",
              marginTop: 18,
            }}
          >
            Sudah memiliki akun?{" "}
            <Text
              style={{ color: colors.darkBlue, fontFamily: "FiraSansMedium" }}
              onPress={() => router.push("/")}
            >
              Masuk ke Akun
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabView: {
    backgroundColor: "white",
    width: "100%",
    height: 150,
  },
  backgroundImage: {
    height: height * 0.5,
    width: "100%",
  },
  overlay: {
    flex: 1,
    flexDirection: "column",
    height: "50%",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    padding: 30,
    alignItems: "center",
  },
  bottomContainer: {
    flexDirection: "column-reverse",
    height: height * 0.5,
    backgroundColor: "#00385F",
    paddingBottom: 60,
  },
  formContainer: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: 90 }], // Adjust this value as needed to center the form vertically
    width: "85%",
    alignSelf: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 28,
    borderRadius: 10,
    // alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 48,
    borderColor: colors.grey,
    borderWidth: 1.5,
    // marginBottom: 4,
    paddingHorizontal: 8,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  formGroup: {
    // paddingTop: 16,
    marginBottom: 16,
  },
  textForm: {
    fontSize: 16,
    fontFamily: "FiraSansMedium",
    marginBottom: 6,
    marginLeft: 8,
    color: colors.darkBlue,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 48,
    justifyContent: "center",
    alignContent: "center",
  },
});
