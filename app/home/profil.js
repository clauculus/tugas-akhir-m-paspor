import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme";
import React, { useState, useEffect } from "react";
import { Button } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Profil() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      router.push("/");
    } catch (error) {
      console.log("Failed to remove login status", error);
    }
  };

  return (
    <SafeAreaView edges={["right", "left", "top"]} style={styles.container}>
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require("../../assets/images/cover-home.png")}
          style={styles.imageBackground}
        >
          <View style={styles.overlayContainer}>
            <Text style={styles.headerText}>Profil</Text>
            <View style={styles.contentContainer}>
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontFamily: "FiraSansMedium",
                    fontSize: 20,
                    color: colors.darkBlue,
                    marginBottom: 4,
                  }}
                >
                  Mira Setiawan
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginLeft: 4,
                  }}
                >
                  <Ionicons name="mail" size={20} color={colors.darkGreen} />
                  <Text
                    style={{
                      fontFamily: "FiraSansRegular",
                      fontSize: 15,
                      color: "black",
                      marginBottom: 6,
                    }}
                  >
                    mira@gmail.com
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginLeft: 4,
                  }}
                >
                  <Ionicons name="call" size={20} color={colors.darkGreen} />
                  <Text
                    style={{
                      fontFamily: "FiraSansRegular",
                      fontSize: 15,
                      color: "black",
                    }}
                  >
                    +623747347239
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View style={{ flexDirection: "column", marginTop: 20, gap: 20 }}>
          <Button
            style={{
              backgroundColor: colors.white,
              width: "85%",
              height: 48,
              borderRadius: 12,
              margin: "auto",
              shadowColor: "#000",
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.25,
              shadowRadius: 6,
              elevation: 1,
              height: 51,
              justifyContent: "left",
            }}
            // onPress={handleCariKuota}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginLeft: 6,
                justifyContent: "left",
              }}
            >
              <Ionicons
                name="notifications"
                size={24}
                color={colors.darkBlue}
              />
              <Text
                style={{
                  color: colors.darkBlue,
                  fontSize: 17,
                  fontFamily: "FiraSansMedium",
                }}
              >
                Notifikasi Pembukaan Kuota
              </Text>
            </View>
          </Button>

          <Button
            style={{
              backgroundColor: colors.white,
              width: "85%",
              height: 48,
              borderRadius: 12,
              margin: "auto",
              shadowColor: "#000",
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.25,
              shadowRadius: 6,
              elevation: 1,
              height: 51,
              justifyContent: "left",
            }}
            onPress={handleLogout}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginLeft: 6,
                justifyContent: "left",
              }}
            >
              <Ionicons name="log-out" size={24} color={colors.inactive} />
              <Text
                style={{
                  color: colors.inactive,
                  fontSize: 17,
                  fontFamily: "FiraSansMedium",
                }}
              >
                Keluar Akun
              </Text>
            </View>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageBackground: {
    height: 270,
    resizeMode: "cover",
    backgroundColor: "pink",
    marginBottom: 0,
  },
  overlayContainer: {
    margin: "auto",
    width: "85%",
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  headerText: {
    color: "white",
    fontSize: 28,
    fontFamily: "FiraSansMedium",
  },
  contentContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginHorizontal: "auto",
    marginTop: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  horizontalScrollContainer: {
    paddingLeft: "7.5%",
    paddingRight: 20,
  },
  horizontalScrollContent: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginVertical: 20,
  },
  scrollItem: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
  },
  card: {
    width: 311,
    height: "auto",
    borderRadius: 10,
    backgroundColor: "white",
    overflowTop: "hidden",
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "FiraSansMedium",
  },
  cardDescription: {
    fontSize: 12,
    color: "gray",
    fontFamily: "FiraSansRegular",
  },
  dateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  selectedDate: {
    fontSize: 16,
    marginTop: 20,
  },
});
