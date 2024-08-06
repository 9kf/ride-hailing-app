import { store } from "@/store/store";
import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";
import { Provider } from "react-redux";

export default function Layout() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.page}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
