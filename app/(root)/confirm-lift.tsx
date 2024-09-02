import { router } from "expo-router";
import { FlatList, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import DriverCard from "@/components/DriverCard";
import LiftLayout from "@/components/LiftLayout";
import { useDriverStore } from "@/store";

export default function ConfirmLift() {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

  return (
    <LiftLayout title={"Choose a Rider"} snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <DriverCard
            item={item}
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(item.id!)}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Ride"
              onPress={() => router.push("/(root)/book-lift")}
            />
          </View>
        )}
      />
    </LiftLayout>
  );
}
