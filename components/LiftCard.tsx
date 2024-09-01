import { Image, Text, View } from "react-native";
import { icons } from "@/constants";
import { Lift } from "@/types/type";
import { formatDate, formatTime } from "@/lib/utils";

export default function LiftCard({
  lift: {
    destination_longitude,
    destination_latitude,
    origin_address,
    destination_address,
    created_at,
    lift_time,
    driver,
    payment_status,
  },
}: {
  lift: Lift;
}) {
  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      {/* Image and Address Section */}
      <View className="flex flex-col items-center justify-center p-3">
        <Image
          source={{
            uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=80&height=90&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
          }}
          className="w-[80px] h-[90px] rounded-lg"
        />

        <View className="flex flex-col mx-2 gap-y-2 flex-1">
          <View className="flex flex-row items-center gap-x-2 mb-2">
            <Image source={icons.to} className="w-5 h-5" />
            <Text className="text-md font-JakartaMedium" numberOfLines={1}>
              {origin_address}
            </Text>
          </View>
          <View className="flex flex-row items-center gap-x-2 mb-2">
            <Image source={icons.to} className="w-5 h-5" />
            <Text className="text-md font-JakartaMedium" numberOfLines={1}>
              {destination_address}
            </Text>
          </View>
          <View className="flex flex-row items-center gap-x-2">
            <Image source={icons.point} className="w-5 h-5" />
            <Text className="text-md font-JakartaMedium" numberOfLines={1}>
              {destination_address}
            </Text>
          </View>
        </View>
      </View>
      {/* Additional Details Section */}
      <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
        <View className="flex flex-row items-center w-full justify-between mb-5">
          <Text className="text-md font-JakartaMedium text-gray-500">
            Date & Time
          </Text>
          <Text className="text-md font-JakartaBold" numberOfLines={1}>
            {formatDate(created_at)}, {formatTime(lift_time)}
          </Text>
        </View>

        <View className="flex flex-row items-center w-full justify-between mb-5">
          <Text className="text-md font-JakartaMedium text-gray-500">
            Driver
          </Text>
          <Text className="text-md font-JakartaBold">
            {driver.first_name} {driver.last_name}
          </Text>
        </View>

        <View className="flex flex-row items-center w-full justify-between mb-5">
          <Text className="text-md font-JakartaMedium text-gray-500">
            Car Seats
          </Text>
          <Text className="text-md font-JakartaBold">{driver.car_seats}</Text>
        </View>

        <View className="flex flex-row items-center w-full justify-between">
          <Text className="text-md font-JakartaMedium text-gray-500">
            Payment Status
          </Text>
          <Text
            className={`text-md capitalize font-JakartaBold ${payment_status === "paid" ? "text-green-500" : "text-red-500"}`}
          >
            {payment_status}
          </Text>
        </View>
      </View>
    </View>
  );
}
