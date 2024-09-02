import { useUser } from "@clerk/clerk-expo";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LiftCard from "@/components/LiftCard";
import { images } from "@/constants";
import { useFetch } from "@/lib/fetch";
import { Lift } from "@/types/type";

export default function Lifts() {
  const { user } = useUser();
  const {
    data: recentLifts,
    loading,
    error,
  } = useFetch<Lift[]>(`/api/lift/${user?.id}`);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={recentLifts}
        renderItem={({ item }) => <LiftCard lift={item} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  style={{ width: 160, height: 160 }}
                  resizeMode="contain"
                />
                <Text style={{ fontSize: 14 }}>No recent lifts found</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={
          <View style={{ marginVertical: 20 }}>
            <Text style={{ fontSize: 24, fontFamily: "JakartaBold" }}>
              All Lifts
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
