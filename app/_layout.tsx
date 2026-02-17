import { queryClient } from "@/clients/queryClient";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { makeServer } from "@/mirage/api";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

declare global {
  interface Window {
    server: ReturnType<typeof makeServer> | undefined;
  }
}
export const unstable_settings = {
  anchor: "(tabs)",
};

if (window.server) {
  window.server.shutdown();
}

if (process.env.NODE_ENV === "development") {
  window.server = makeServer({ environment: "development" });
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
