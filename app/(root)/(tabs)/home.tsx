import LiftCard from "@/components/LiftCard";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const recentLift = [
  {
    lift_id: "1",
    origin_address: "Maputo, Mozambique",
    destination_address: "Beira, Mozambique",
    origin_latitude: "-25.965535",
    origin_longitude: "32.589250",
    destination_latitude: "-19.842728",
    destination_longitude: "34.838044",
    lift_time: 391,
    fare_price: "19500.00",
    payment_status: "paid",
    driver_id: 2,
    user_id: "1",
    created_at: "2024-09-01 05:19:20.620007",
    driver: {
      driver_id: "2",
      first_name: "Carlos",
      last_name: "Silva",
      profile_image_url:
        "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
      car_image_url:
        "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
      car_seats: 5,
      rating: "4.60",
    },
  },
  {
    lift_id: "2",
    origin_address: "Lilongwe, Malawi",
    destination_address: "Blantyre, Malawi",
    origin_latitude: "-13.962610",
    origin_longitude: "33.787731",
    destination_latitude: "-15.785381",
    destination_longitude: "35.009709",
    lift_time: 491,
    fare_price: "24500.00",
    payment_status: "paid",
    driver_id: 1,
    user_id: "1",
    created_at: "2024-08-30 06:12:17.683046",
    driver: {
      driver_id: "1",
      first_name: "John",
      last_name: "Mwale",
      profile_image_url:
        "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      car_image_url:
        "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      car_seats: 4,
      rating: "4.80",
    },
  },
  {
    lift_id: "3",
    origin_address: "Nampula, Mozambique",
    destination_address: "Pemba, Mozambique",
    origin_latitude: "-15.116243",
    origin_longitude: "39.316118",
    destination_latitude: "-12.975938",
    destination_longitude: "40.517939",
    lift_time: 124,
    fare_price: "6200.00",
    payment_status: "paid",
    driver_id: 1,
    user_id: "1",
    created_at: "2024-08-22 08:49:01.809053",
    driver: {
      driver_id: "1",
      first_name: "John",
      last_name: "Mwale",
      profile_image_url:
        "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      car_image_url:
        "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      car_seats: 4,
      rating: "4.80",
    },
  },
  {
    lift_id: "4",
    origin_address: "Zomba, Malawi",
    destination_address: "Machinga, Malawi",
    origin_latitude: "-15.380172",
    origin_longitude: "35.315126",
    destination_latitude: "-15.518934",
    destination_longitude: "35.222934",
    lift_time: 159,
    fare_price: "7900.00",
    payment_status: "paid",
    driver_id: 3,
    user_id: "1",
    created_at: "2024-07-12 18:43:54.297838",
    driver: {
      driver_id: "3",
      first_name: "Miguel",
      last_name: "Gomes",
      profile_image_url:
        "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
      car_image_url:
        "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
      car_seats: 4,
      rating: "4.70",
    },
  },
  {
    lift_id: "5",
    origin_address: "Maputo, Mozambique",
    destination_address: "Matola, Mozambique",
    origin_latitude: "-25.965535",
    origin_longitude: "32.589250",
    destination_latitude: "-25.889213",
    destination_longitude: "32.493438",
    lift_time: 45,
    fare_price: "2200.00",
    payment_status: "paid",
    driver_id: 4,
    user_id: "2",
    created_at: "2024-07-12 10:15:00.000000",
    driver: {
      driver_id: "4",
      first_name: "Ana",
      last_name: "Fernandes",
      profile_image_url:
        "https://ucarecdn.com/2c23e06f-813b-4f78-9359-1e69f4d8b024/-/preview/1000x666/",
      car_image_url:
        "https://ucarecdn.com/9e2d2f46-d74e-4827-a13b-07c535d8a72f/-/preview/930x932/",
      car_seats: 4,
      rating: "4.50",
    },
  },
  {
    lift_id: "6",
    origin_address: "Chimoio, Mozambique",
    destination_address: "Tete, Mozambique",
    origin_latitude: "-19.163014",
    origin_longitude: "33.483077",
    destination_latitude: "-15.780146",
    destination_longitude: "31.806712",
    lift_time: 220,
    fare_price: "11000.00",
    payment_status: "paid",
    driver_id: 5,
    user_id: "3",
    created_at: "2024-05-12 15:30:00.000000",
    driver: {
      driver_id: "5",
      first_name: "Lucas",
      last_name: "Pereira",
      profile_image_url:
        "https://ucarecdn.com/3e9f9f2a-e6d7-4c58-b517-6e0e0c5e8c2f/-/preview/1000x666/",
      car_image_url:
        "https://ucarecdn.com/64f7a5d1-2b5e-43d7-bf77-9d5678caa6b6/-/preview/930x932/",
      car_seats: 4,
      rating: "4.40",
    },
  },
];


export default function Page() {
  const { user } = useUser();
  const loading=false;
  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recentLift?.slice(0, 5)}
        renderItem={({ item }) => <LiftCard lift={item} />}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm">No recent rides found</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={
          <>
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-2xl font-JakartaExtraBold">
                Welcome {user?.firstName}👋
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>

            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />

            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Your current location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
            </>

            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Recent Rides
            </Text>
          </>
        }
      />
    </SafeAreaView>
  );
}
