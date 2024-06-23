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
      // Define your custom colors here
      customColors: {
        500: "#00395D",
      },
    },
    components: {
      Radio: {
        defaultProps: {
          colorScheme: "customColors", // Set the default color scheme for radio buttons
        },
        baseStyle: {
          // _text: {
          //   fontSize: "md", // Default font size for radio text
          //   fontWeight: "bold",
          // },
          _checked: {
            // bg: "#ffffff",
            // color: "#00395D",
            // borderColor: "#00395D", // Specific border color when checked
            // backgroundColor: "#00395D", // Specific background color when checked
            _icon: {
              color: "customColors.500", // Middle color when checked
            },
          },
          _unchecked: {
            borderColor: "#00395D", // Specific border color when unchecked
          },
        },
      },
      Select: {
        defaultProps: {
          _selectedItem: {
            bg: "primary", // Background color when selected
            _text: { color: "white" }, // Text color when selected
          },
          _dropdown: {
            borderRadius: "md", // Border radius for dropdown
            mt: 1, // Margin top for dropdown
            bg: "white", // Background color for dropdown
            height: 200, // Height of the dropdown
            borderWidth: 1.5, // Border width for dropdown
            borderColor: "gray.300", // Border color for dropdown
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
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="otp" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </PaperProvider>
  );
}
