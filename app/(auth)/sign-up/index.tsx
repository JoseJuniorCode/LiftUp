import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React from "react";

export function SignUp() {
  return (
    <SafeAreaView>
      <Text>Profile On!</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
