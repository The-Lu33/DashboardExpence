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
        <View className="mb-32 mt-2">
          <Text className="text-3xl font-bold">Welcome Back</Text>
          <Text className="text-base font-light">Welcome back to Dashboard</Text>
        </View>
        <LoginForm />
      </View>
    </SafeAreaView>
  );
}
