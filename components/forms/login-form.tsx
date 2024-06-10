import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Text } from "../Themed";

export default function LoginForm() {
  const theme = useColorScheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  return (
    <View className="w-full">
      <View
        className="border border-gray-500/50 rounded-lg flex flex-row items-center justify-start "
        style={{
          width: "100%",
          maxWidth: 450,
          height: 45,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Feather name="user" size={24} color={Colors[theme ?? "light"].text} />
        <TextInput
          placeholder="Email"
          onChange={(e) => setEmail(e.nativeEvent.text)}
          value={email}
          placeholderTextColor={"gray"}
          underlineColorAndroid="transparent"
          style={{
            fontSize: 20,
            color: Colors[theme ?? "light"].text,
            height: "90%",
            width: "80%",
            marginLeft: 5,
          }}
        />
      </View>
      <View
        className="border border-gray-500/50 rounded-lg flex flex-row items-center justify-start mt-6"
        style={{
          width: "100%",
          maxWidth: 450,
          height: 45,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Feather name="lock" size={24} color={Colors[theme ?? "light"].text} />
        <TextInput
          placeholder="Password"
          onChange={(e) => setPassword(e.nativeEvent.text)}
          value={password}
          secureTextEntry={showPassword}
          style={{
            fontSize: 20,
            color: Colors[theme ?? "light"].text,
            width: "80%",
            height: "90%",
            marginLeft: 5,
          }}
        />
        {showPassword ? (
          <Feather name="eye" size={24} color={Colors[theme ?? "light"].text} />
        ) : (
          <Feather
            name="eye-off"
            size={24}
            color={Colors[theme ?? "light"].text}
          />
        )}
      </View>
      <Text className="text-[#999999] mt-2">Forgot Password?</Text>

      <View className="w-[90%] flex justify-center items-center mt-8 h-16 mx-auto rounded-xl bg-[#5B37B7]">
        <TouchableOpacity>
          <Text className="text-2xl text-white">Login</Text>
        </TouchableOpacity>
      </View>
      <View className="mx-auto flex flex-row justify-center items-center mt-40">
        <Text className="text-lg">Don’t have an account?</Text>
        <TouchableOpacity>
          <Text className="text-[#5B37B7] text-bold ml-1 text-lg">
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
