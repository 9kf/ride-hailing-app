import { store } from "@/store/store";
import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

export default function Layout() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <SafeAreaView style={styles.page}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
