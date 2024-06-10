import LoginForm from "@/components/forms/login-form";
import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { SafeAreaView, useColorScheme, View } from "react-native";

export default function Login() {
  const theme = useColorScheme();
  return (
    <SafeAreaView
      className="h-screen w-full "
      style={{
        backgroundColor: "#D9D9D9",
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
        <View className="mb-20">
          <Text className="text-3xl font-bold">Welcome Back</Text>
          <Text className="text-lg font-light">Welcome back to Dashboard</Text>
        </View>
        <LoginForm />
      </View>
    </SafeAreaView>
  );
}
