import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />;
      <Stack.Screen name="find-lift" options={{ headerShown: false }} />
      <Stack.Screen
        name="confirm-lift"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="book-lift"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
