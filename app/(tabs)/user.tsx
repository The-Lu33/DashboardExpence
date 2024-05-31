import { Text, View } from "@/components/Themed";
import Avatar from "@/components/ui/avatar";
import Colors from "@/constants/Colors";
import { Image, SafeAreaView, useColorScheme } from "react-native";

export default function User() {
  const theme = useColorScheme();
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors[theme ?? "light"].background,
        flex: 1,
      }}
    >
      <View
        style={{
          paddingTop: 54,
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <View className="flex flex-row px-4 items-center gap-4 mt-2">
          <Avatar
            source={{
              uri: "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            }}
            style={{
              width: 100,
              height: 100,
            }}
          />
          <View>
            <Text className="font-bold text-3xl ">Miley Tapia</Text>
          </View>
        </View>
        <View className="mt-12">
          <View className="flex flex-row px-6 mt-8 items-center ">
            <View
              className={`p-2 w-12 justify-center items-center rounded-2xl  mr-3`}
              style={{
                backgroundColor: "#EEE5FF",
              }}
            >
              <Image
                source={require("@/assets/images/settings.png")}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </View>
            <Text className="text-xl font-semiBold ">Logout</Text>
          </View>
          <View className="flex flex-row px-6 mt-8 items-center ">
            <View
              className={`p-2 w-12 justify-center items-center rounded-2xl  mr-3`}
              style={{
                backgroundColor: "#FFE2E4",
              }}
            >
              <Image
                source={require("@/assets/images/logout.png")}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </View>
            <Text className="text-xl font-semiBold ">Settings</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
