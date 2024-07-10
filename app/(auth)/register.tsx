import RegisterForm from "@/components/forms/register-form";
import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { SafeAreaView, useColorScheme } from "react-native";
import { View } from "react-native";

export default function Register() {
  const theme = useColorScheme();

  return (
    <SafeAreaView
      className="h-screen w-full "
      style={{
        backgroundColor: theme === "light" ? "#D9D9D9" : "#2F2F2F",
        flex: 1,
      }}
    >
      <View
        style={{
          paddingTop: 10,

          // marginBottom: 10,
          marginTop: 60,
          backgroundColor: Colors[theme ?? "light"].background,
        }}
        className="w-full h-full px-4 rounded-t-3xl"
      >
        <View className="mb-24 mt-2 relative">
          <Text className="text-3xl font-bold">
            Welcome to your Personal Dashboard
          </Text>
          <Text className="text-lg font-light">the best way to keep track</Text>
        </View>
        <RegisterForm />
      </View>
    </SafeAreaView>
  );
}
