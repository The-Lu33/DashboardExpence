import Colors from "@/constants/Colors";
import { Feather, MaterialIcons } from "@expo/vector-icons";
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
import AlertUI from "../ui/alert";

export default function RegisterForm() {
  const theme = useColorScheme();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const [missingFields, setMissingFields] = useState({
    name: false,
    lastName: false,
    email: false,
    password: false,
  });

  async function handleRegister() {
    try {
      // Reset missing fields state
      setMissingFields({
        name: false,
        lastName: false,
        email: false,
        password: false,
      });

      // Check for missing data
      let hasError = false;
      if (!name) {
        setMissingFields((prev) => ({ ...prev, name: true }));
        hasError = true;
      }
      if (!lastName) {
        setMissingFields((prev) => ({ ...prev, lastName: true }));
        hasError = true;
      }
      if (!email) {
        setMissingFields((prev) => ({ ...prev, email: true }));
        hasError = true;
      }
      if (!password) {
        setMissingFields((prev) => ({ ...prev, password: true }));
        hasError = true;
      }

      if (hasError) {
        setError(true);
        setMessage("Please fill in all fields.");
        setShowAlert(true);
        return;
      }

      // Proceed with registration
      const result = await register({
        name,
        last_name: lastName,
        email,
        password,
      });

      if (result.success) {
        setMessage(result.message);
        setShowAlert(true);
      } else {
        setError(true);
        setMessage(result.message);
        setShowAlert(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(true);
        setMessage(error.message);
        setShowAlert(true);
      }
    }
  }

  return (
    <>
      <View className="w-full">
        <View
          className={`border ${missingFields.name ? "border-red-500" : "border-gray-500/50"} rounded-lg flex flex-row items-center justify-start mt-6`}
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
            color={missingFields.name ? "red" : Colors[theme ?? "light"].text}
          />
          <TextInput
            placeholder="Name"
            onChange={(e) => setName(e.nativeEvent.text)}
            value={name}
            placeholderTextColor={missingFields.name ? "red" : "gray"}
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
          className={`border ${missingFields.lastName ? "border-red-500" : "border-gray-500/50"} rounded-lg flex flex-row items-center justify-start mt-6`}
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
            color={missingFields.lastName ? "red" : Colors[theme ?? "light"].text}
          />
          <TextInput
            placeholder="Last Name"
            onChange={(e) => setLastName(e.nativeEvent.text)}
            value={lastName}
            placeholderTextColor={missingFields.lastName ? "red" : "gray"}
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
          className={`border ${missingFields.email ? "border-red-500" : "border-gray-500/50"} rounded-lg flex flex-row items-center justify-start mt-6`}
          style={{
            width: "100%",
            maxWidth: 450,
            height: 45,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <Feather
            name="mail"
            size={24}
            color={missingFields.email ? "red" : Colors[theme ?? "light"].text}
          />
          <TextInput
            placeholder="Email"
            onChange={(e) => setEmail(e.nativeEvent.text)}
            value={email}
            placeholderTextColor={missingFields.email ? "red" : "gray"}
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
          className={`border ${missingFields.password ? "border-red-500" : "border-gray-500/50"} rounded-lg flex flex-row items-center justify-start mt-6`}
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
            onChange={(e) => setPassword(e.nativeEvent.text)}
            value={password}
            secureTextEntry={!showPassword}
            style={{
              fontSize: 20,
              color: Colors[theme ?? "light"].text,
              width: "80%",
              height: "90%",
              marginLeft: 5,
            }}
          />
          <TouchableOpacity
            style={{
              marginLeft: 20,
            }}
            onPress={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? (
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
        <Text className="text-[#999999] mt-2">Forgot Password?</Text>

        <TouchableOpacity onPress={handleRegister}>
          <View className="w-[90%] flex justify-center items-center mt-8 h-16 mx-auto rounded-xl bg-[#5B37B7]">
            <Text className="text-2xl text-white">Register</Text>
          </View>
        </TouchableOpacity>
        <View className="mx-auto flex flex-row justify-center items-center mt-40">
          <Text className="text-lg mr-1">do you already have an account?</Text>
          <Link href={"/login"}>
            <Text className="text-[#5B37B7] text-bold text-lg">Login</Text>
          </Link>
        </View>
      </View>
      {showAlert && (
        <AlertUI
          TEXT={message}
          COLOR={error ? "red" : "green"}
          onClose={() => setShowAlert(false)}
          ICON={
            error ? (
              <MaterialIcons name="error" size={50} color="red" />
            ) : (
              <Feather name="user-check" size={50} color={"green"} />
            )
          }
        />
      )}
    </>
  );
}
