import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React from "react";

export function Welcome() {
  return (
    <SafeAreaView>
      <Text>Welcome On!</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
