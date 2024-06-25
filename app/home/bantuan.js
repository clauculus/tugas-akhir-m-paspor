import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme";
import React, { useState, useEffect } from "react";
import { Button } from "native-base";

import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Bantuan() {
  const router = useRouter();

  const handleLogOut = () => {
    router.push("/");
  };

  return (
    <SafeAreaView edges={["right", "left", "top"]} style={styles.container}>
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require("../../assets/images/cover-home.png")}
          style={styles.imageBackground}
        >
          <View style={styles.overlayContainer}>
            <Text style={styles.headerText}>Bantuan</Text>
            <View style={styles.contentContainer}>
              <TouchableWithoutFeedback
                onPress={() => router.push("/bantuan/faq")}
              >
                <View
                  style={{
                    marginBottom: 10,
                    // backgroundColor: "pink",
                    paddingLeft: 8,
                    paddingBottom: 10,
                    borderBottomWidth: 1,
                    borderColor: "#E8E8E8",
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
                      }}
                    >
                      FAQ (Frequently Asked Question)
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color={colors.darkBlue}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "FiraSansRegular",
                      fontSize: 15,
                      color: "black",
                      marginBottom: 6,
                    }}
                  >
                    Akses pertanyaan yang sering diajukan
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => router.push("/bantuan/manual")}
              >
                <View
                  style={{
                    // marginBottom: 10,
                    // backgroundColor: "pink",
                    paddingLeft: 8,
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
                        marginTop: 4,
                        marginBottom: 4,
                      }}
                    >
                      Manual Penggunaan Aplikasi
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color={colors.darkBlue}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "FiraSansRegular",
                      fontSize: 15,
                      color: "black",
                      // marginBottom: 6,
                    }}
                  >
                    Akses manual penggunaan M-Paspor
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ImageBackground>
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
    paddingHorizontal: 15,
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
