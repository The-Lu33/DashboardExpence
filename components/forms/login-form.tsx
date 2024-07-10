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
import { Link } from "expo-router";
import useAuth from "@/hooks/useAuth";

export default function LoginForm() {
  const theme = useColorScheme();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const [missingFields, setMissingFields] = useState({
    email: false,
    password: false,
  });

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // const validatePassword = (password: string) => {
  //   const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6,}$/;
  //   return regex.test(password);
  // };

  async function handleLogin() {
    try {
      // Reset missing fields state
      setMissingFields({
        email: false,
        password: false,
      });

      // Check for missing data and validate fields
      let hasError = false;
      if (!email) {
        setMissingFields((prev) => ({ ...prev, email: true }));
        hasError = true;
      } else if (!validateEmail(email)) {
        setMissingFields((prev) => ({ ...prev, email: true }));
        hasError = true;
        setMessage("Please enter a valid email address.");
      }

      // if (!password) {
      //   setMissingFields((prev) => ({ ...prev, password: true }));
      //   hasError = true;
      // }
       //else if (!validatePassword(password)) {
      //   setMissingFields((prev) => ({ ...prev, password: true }));
      //   hasError = true;
      //   setMessage(
      //     "Password must be at least 6 characters long, contain an uppercase letter, and a special character."
      //   );
      // }

      if (hasError) {
        setError(true);
        setShowAlert(true);
        return;
      }

      // Proceed with login
      await login({ email, password });
    } catch (error) {
      if (error instanceof Error) {
        setError(true);
        setMessage(error.message);
        setShowAlert(true);
      }
    }
  }

  return (
    <View className="w-full">
      <View
        className={`border ${
          missingFields.email ? "border-red-500" : "border-gray-500/50"
        } rounded-lg flex flex-row items-center justify-start overflow-hidden`}
        style={{
          width: "100%",
          maxWidth: 450,
          height: 45,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Feather
          name="user"
          size={24}
          color={missingFields.email ? "red" : Colors[theme ?? "light"].text}
        />
        <TextInput
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.nativeEvent.text);
            setMissingFields((prev) => ({ ...prev, email: false }));
          }}
          value={email}
          placeholderTextColor={missingFields.email ? "red" : "gray"}
          underlineColorAndroid="transparent"
          style={{
            fontSize: 16,
            color: Colors[theme ?? "light"].text,
            height: "90%",
            width: "95%",
            marginLeft: 4,
          }}
        />
      </View>
      <View
        className={`border ${
          missingFields.password ? "border-red-500" : "border-gray-500/50"
        } rounded-lg flex flex-row items-center justify-start mt-6`}
        style={{
          width: "100%",
          maxWidth: 450,
          height: 45,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Feather
          name="lock"
          size={24}
          color={missingFields.password ? "red" : Colors[theme ?? "light"].text}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={missingFields.password ? "red" : "gray"}
          onChange={(e) => {
            setPassword(e.nativeEvent.text);
            setMissingFields((prev) => ({ ...prev, password: false }));
          }}
          value={password}
          secureTextEntry={showPassword}
          style={{
            fontSize: 16,
            color: Colors[theme ?? "light"].text,
            width: "85%",
            height: "90%",
            marginLeft: 4,
          }}
        />
        <TouchableOpacity
          style={{
            marginLeft: 4,
          }}
          onPress={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Feather
              name="eye"
              size={24}
              color={Colors[theme ?? "light"].text}
            />
          ) : (
            <Feather
              name="eye-off"
              size={24}
              color={Colors[theme ?? "light"].text}
            />
          )}
        </TouchableOpacity>
      </View>
      <Text className="text-[#999999] mt-3">Forgot Password?</Text>

      <TouchableOpacity onPress={handleLogin}>
        <View className="w-[90%] flex justify-center items-center mt-8 h-16 mx-auto rounded-xl bg-[#5B37B7]">
          <Text className="text-2xl text-white">Login</Text>
        </View>
      </TouchableOpacity>
      <View className="mx-auto flex flex-row justify-center items-center mt-40">
        <Text className="text-sm mr-1">Don’t have an account?</Text>
        <Link href={"/register"}>
          <Text className="text-[#5B37B7] text-bold text-sm">Register</Text>
        </Link>
      </View>
      {showAlert && (
        <View className="absolute top-0 left-0 right-0 p-4 bg-red-500">
          <Text className="text-white text-center">{message}</Text>
          <TouchableOpacity onPress={() => setShowAlert(false)}>
            <Text className="text-white text-center mt-2">Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
