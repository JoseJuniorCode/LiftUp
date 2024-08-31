import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React from "react";

export function Profile() {
  return (
    <SafeAreaView>
      <Text>Profile On!</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
