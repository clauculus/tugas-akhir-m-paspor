import { Stack } from "expo-router";
import { NativeBaseProvider, extendTheme } from "native-base";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

export default function RootLayout() {
  const [loaded] = useFonts({
    FiraSansRegular: require("../assets/fonts/FiraSans-Regular.ttf"),
    FiraSansMedium: require("../assets/fonts/FiraSans-Medium.ttf"),
    FiraSansSemiBold: require("../assets/fonts/FiraSans-SemiBold.ttf"),
  });

  const customTheme = extendTheme({
    colors: {
      customColors: {
        500: "#00395D",
      },
    },
    components: {
      Radio: {
        defaultProps: {
          colorScheme: "customColors",
        },
        baseStyle: {
          // _text: {
          //   fontSize: "md",
          //   fontWeight: "bold",
          // },
          _checked: {
            // bg: "#ffffff",
            // color: "#00395D",
            // borderColor: "#00395D",
            // backgroundColor: "#00395D",
            _icon: {
              color: "customColors.500",
            },
          },
          _unchecked: {
            borderColor: "#00395D",
          },
        },
      },
      Select: {
        defaultProps: {
          _selectedItem: {
            bg: "primary",
            _text: { color: "white" },
          },
          _dropdown: {
            borderRadius: "md",
            mt: 1,
            bg: "white",
            height: 200,
            borderWidth: 1.5,
            borderColor: "gray.300",
          },
        },
      },
    },
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <NativeBaseProvider theme={customTheme}>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="home" options={{ headerShown: false }} />

            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="otp" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            {/* <Stack.Screen name="home" options={{ headerShown: false }} /> */}
            <Stack.Screen name="lokasi" options={{ headerShown: false }} />
            <Stack.Screen name="form" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </PaperProvider>
  );
}
