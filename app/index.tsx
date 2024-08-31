import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
export default function Index() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className={"text-green-500"}>Ride On!</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
