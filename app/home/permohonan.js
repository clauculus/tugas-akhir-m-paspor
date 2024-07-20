import { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Input } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useRouter } from "expo-router";
import { colors } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FirstRoute = ({ data, setData }) => {
  const router = useRouter();
  const [temporaryData, setTemporaryData] = useState(`${data}`);
  const [drafts, setDrafts] = useState([]);

  const getColor = (status) => {
    if (status === "PENGISIAN FORMULIR") {
      return colors.yellow;
    } else if (status === "Pembayaran Gagal") {
      return "red";
    } else {
      return colors.green;
    }
  };

  const handleDetail = (id) => {
    console.log("ke detail");
    router.push({
      pathname: "/form/detailPermohonan",
      params: {
        draftId: id,
      },
    });
  };

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const existingDrafts = await AsyncStorage.getItem("drafts");
        let drafts = existingDrafts ? JSON.parse(existingDrafts) : [];
        drafts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        console.log(drafts);
        setDrafts(drafts);
        console.log(drafts);
      } catch (error) {
        console.error("Failed to fetch the draft", error);
      }
    };

    fetchDraft();
    console.log("tes");
  }, []);

  // console.log(drafts[1].step1.nama);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 24,
        paddingTop: 20,
      }}
    >
      {/* <TextInput
        style={styles.input}
        placeholder="62XXXXXXXXXXX"
        keyboardType="numeric"
        onChangeText={(val) => {
          setTemporaryData(val);
          console.log(val);
        }}
        onEndEditing={() => setData(temporaryData)}
        defaultValue={data}
      />
      <Text
        style={{
          color: colors.inactive,
          fontSize: 13,
          fontFamily: "FiraSansRegular",
          marginBottom: 18,
          marginLeft: 10,
        }}
      >
        Kode OTP akan dikirim ke nomor di atas
      </Text> */}
      {drafts.length > 0 &&
        drafts.map((draft) => (
          <TouchableOpacity
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
              marginBottom: 24,
            }}
            key={draft.id}
            onPress={() => handleDetail(draft.id)}
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

                  fontSize: 16,
                  color: colors.darkBlue,
                  fontFamily: "FiraSansMedium",
                }}
              >
                Lokasi
              </Text>
              <Text
                style={{
                  fontFamily: "FiraSansRegular",
                  fontSize: 16,
                }}
              >
                {": "}
              </Text>
              <Text
                style={{
                  fontFamily: "FiraSansRegular",
                  fontSize: 16,
                  width: "64%",
                }}
              >
                {draft.detailLokasi.lokasi.nama.toUpperCase()}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: "36%",
                  fontSize: 16,
                  color: colors.darkBlue,
                  fontFamily: "FiraSansMedium",
                }}
              >
                Tanggal Kedatangan
              </Text>
              <Text
                style={{
                  fontFamily: "FiraSansRegular",
                  fontSize: 16,
                }}
              >
                {": "}
              </Text>
              <Text style={{ fontFamily: "FiraSansRegular", fontSize: 16 }}>
                {draft.selectedDate} JULI 2024
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: "36%",
                  fontSize: 16,
                  color: colors.darkBlue,
                  fontFamily: "FiraSansMedium",
                }}
              >
                Jam Kedatangan
              </Text>
              <Text
                style={{
                  fontFamily: "FiraSansRegular",
                  fontSize: 16,
                }}
              >
                {": "}
              </Text>
              <Text style={{ fontFamily: "FiraSansRegular", fontSize: 16 }}>
                {draft.selectedTime} WIB
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: "36%",
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
                <Text
                  style={{
                    fontFamily: "FiraSansRegular",
                    fontSize: 16,
                  }}
                >
                  {": "}
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
                    {draft.status.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

const SecondRoute = ({ data, setData }) => {
  const [temporaryData, setTemporaryData] = useState(`${data}`);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
        height: "auto",
        paddingHorizontal: 24,
        paddingTop: 20,
      }}
    >
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
          MIRA SETIAWAN
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              width: "36%",
              fontSize: 16,
              color: colors.darkBlue,
              fontFamily: "FiraSansMedium",
            }}
          >
            Lokasi
          </Text>
          <Text style={{ fontFamily: "FiraSansRegular", fontSize: 16 }}>
            : ULP BANDUNG
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              width: "36%",
              fontSize: 16,
              color: colors.darkBlue,
              fontFamily: "FiraSansMedium",
            }}
          >
            Tanggal Kedatangan
          </Text>
          <Text style={{ fontFamily: "FiraSansRegular", fontSize: 16 }}>
            : JUMAT, 20 MEI 2023
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              width: "36%",
              fontSize: 16,
              color: colors.darkBlue,
              fontFamily: "FiraSansMedium",
            }}
          >
            Jam Kedatangan
          </Text>
          <Text style={{ fontFamily: "FiraSansRegular", fontSize: 16 }}>
            : 08.00 - 09.00 WIB
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              width: "36%",
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
            <Text>: </Text>
            <View
              style={{
                backgroundColor: "red",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "FiraSansMedium",
                  fontSize: 16,
                }}
              >
                PEMBAYARAN GAGAL
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const renderCustomTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.darkBlue }}
    style={{ backgroundColor: "white" }}
    labelStyle={{
      fontFamily: "FiraSansMedium",
      fontSize: 16,
      textTransform: "none",
      borderRadius: 10,
    }}
    activeColor={colors.darkBlue}
    inactiveColor="gray"
  />
);

export default function Index() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [routes] = useState([
    { key: "first", title: "Aktif" },
    { key: "second", title: "Riwayat" },
  ]);

  const renderScene = SceneMap({
    first: () => <FirstRoute data={phone} setData={setPhone} />,
    second: () => <SecondRoute data={email} setData={setEmail} />,
  });

  return (
    <SafeAreaView edges={["right", "left", "top"]} style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/gradient-bg.png")}
        style={styles.navbar}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 24,
                fontFamily: "FiraSansMedium",
                marginLeft: 20,
              }}
            >
              Permohonan
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.container}>
        {/* <ImageBackground
          source={require("../../assets/images/cover-login.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.overlay}>
            <View
              style={{
                flexDirection: "row",
                padding: 10,
              }}
            >
              <Image
                source={require("../../assets/images/pengayoman-logo.png")}
                style={{
                  marginHorizontal: 10,
                }}
              />
              <Image
                source={require("../../assets/images/imigrasi-logo.png")}
                style={{
                  marginHorizontal: 10,
                }}
              />
            </View>
            <Text
              style={{
                color: "white",
                fontSize: 28,
                textAlign: "center",
                fontFamily: "FiraSansSemiBold",
              }}
            >
              Selamat Datang di Aplikasi M-Paspor!
            </Text>
          </View>
        </ImageBackground> */}

        {/* <View style={styles.bottomContainer}>
          <Text
            style={{
              paddingTop: 24,
              textAlign: "center",
              color: "white",
              marginBottom: 44,
              fontFamily: "FiraSansRegular",
            }}
          >
            ©️ 2024 Direktorat Jenderal Imigrasi Republik Indonesia
          </Text>
        </View> */}
        <View style={styles.formContainer}>
          <TabView
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderTabBar={renderCustomTabBar}
            renderScene={renderScene}
            style={styles.tabView}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
  },
  tabView: {
    backgroundColor: "white",
    width: "100%",
    // height: height * 0.5,
    // height: 900,
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
    // top: "50%",
    // transform: [{ translateY: 250 }], // Adjust this value as needed to center the form vertically
    width: "100%",
    alignSelf: "center",
    // paddingHorizontal: 20,
    // paddingBottom: 20,
    // paddingTop: 10,
    height: "100%",
    alignItems: "center",
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
    marginBottom: 4,
    marginTop: 16,
    paddingHorizontal: 8,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
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
    fontSize: 16,
    marginLeft: 10,
  },
});
