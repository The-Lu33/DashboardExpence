import { Text, View } from "@/components/Themed";
import Avatar from "@/components/ui/avatar";
import Colors from "@/constants/Colors";
import useAuth from "@/hooks/useAuth";
import {
  Image,
  SafeAreaView,
  useColorScheme,
  TouchableOpacity,
  Platform,
} from "react-native";

export default function User() {
  const theme = useColorScheme();
  const { logout } = useAuth();
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors[theme ?? "light"].background,
        flex: 1,
      }}
    >
      <View
        style={{
          paddingTop: Platform.OS === "android" ? 50 : "auto",
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
              className={`p-2 w-12 h-12 justify-center items-center rounded-2xl  mr-3`}
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
            <Text className="text-base font-semiBold ">Settings</Text>
          </View>
          <TouchableOpacity onPress={logout}>
            <View className="flex flex-row px-6 mt-8 items-center ">
              <View
                className={`p-2 w-12 h-12 justify-center items-center rounded-2xl  mr-3`}
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
              <Text className="text-base font-semiBold ">Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
