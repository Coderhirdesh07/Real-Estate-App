import { Link } from "expo-router";
import { Text, View,Image, TouchableOpacity } from "react-native";
import '../../../global.css';
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/Search";
import { Card, FeaturedCard } from "@/components/Cards";

export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5">
      <View className="flex flex-row items-center justify-between mt-5">
      <View className=" flex flex-row items-center">
        <Image source={} className="size-12 rounded-full"/>
        <View className="flex flex-col items-start ml-2 justify-center">
        <Text className="text-xs font-thin">Good Morning</Text>
        <Text className="text-base font-thin text-black">Hird</Text>
        </View>
      </View>
      <Image  source = {} className="size-6"/>
      </View>
      <Search/>

      <View className="my-5">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-xl font-thin text-black">Featured</Text>

        <TouchableOpacity>
          <Text className="text-base font-thin text-primary-200">See All</Text>
        </TouchableOpacity>

      </View>

      </View>
      </View>

      <FeaturedCard/>
      <Card/>
    </SafeAreaView>
  );
}
