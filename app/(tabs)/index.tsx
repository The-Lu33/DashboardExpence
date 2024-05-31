import { Image, SafeAreaView, View, useColorScheme } from "react-native";
import data from "@/utils/example/data.json";

import Line from "@/components/charts/line";
import RecentMovement from "@/components/movement/recent-movement";
import Colors from "@/constants/Colors";
import { Text } from "@/components/Themed";
interface LineData {
  value: number;
  date: string;
}
export default function Home() {
  const theme = useColorScheme();

  const lineData: LineData[] = data.map((item) => ({
    value: item.mount,
    date: item.date,
  }));
  console.log(lineData);
  return (
    <SafeAreaView
      className=" h-screen"
      style={{
        backgroundColor: Colors[theme ?? "light"].background,
        flex: 1,
      }}
    >
      {/* <StatusBar style="auto" /> */}
      <View className="w-full flex  h-32 rounded-b-2xl bg-[#5B37B7] justify-end pb-8">
        <View className="flex-row justify-evenly">
          {/* cards */}
          <View className="w-36 h-16 bg-green-600 rounded-3xl p-2 flex-row items-center justify-center gap-x-2">
            <View className="bg-white rounded-xl w-10 h-10 items-center justify-center">
              <Image source={require("@/assets/images/income.png")} />
            </View>
            <View>
              <Text className="font-medium text-xs text-white">Income</Text>
              <Text className="font-semibold text-base text-white">
                $500,00
              </Text>
            </View>
          </View>
          <View className="w-36 h-16 bg-red-600 rounded-3xl p-2 flex-row items-center justify-center gap-x-2">
            <View className="bg-white rounded-xl w-10 h-10 items-center justify-center">
              <Image source={require("@/assets/images/expenses.png")} />
            </View>
            <View>
              <Text className="font-medium text-xs text-white">Income</Text>
              <Text className="font-semibold text-base text-white">
                $500,00
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="w-full  mt-2 flex justify-start">
        <Line data={lineData} />
      </View>
      <View className="mt-6 px-2 flex-1">
        <RecentMovement />
      </View>
    </SafeAreaView>
  );
}
