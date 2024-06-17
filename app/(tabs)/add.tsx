import {
  Image,
  SafeAreaView,
  TextInput,
  View,
  useColorScheme,
} from "react-native";
import Colors from "@/constants/Colors";
import { Text } from "@/components/Themed";
import SwitchSelector from "react-native-switch-selector";
import { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
export default function Add() {
  const theme = useColorScheme();
  const [reportSelect, SetReportSelect] = useState("EXPENSE");

  return (
    <SafeAreaView
      style={{
        backgroundColor: reportSelect === "EXPENSE" ? "#ef4444" : "#22c55e",
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
        <SwitchSelector
          initial={0}
          onPress={(value) => SetReportSelect(value as string)}
          textColor={"black"} //'#7a44cf'
          selectedColor={"white"}
          buttonColor={reportSelect === "EXPENSE" ? "#ef4444" : "#22c55e"}
          height={55}
          borderColor={reportSelect === "EXPENSE" ? "#ef4444" : "#22c55e"}
          bold={true}
          hasPadding
          animationDuration={200}
          selectedTextStyle={{
            fontSize: 24,
            fontWeight: "bold",
          }}
          options={[
            { label: "Gastos", value: "EXPENSE" },
            { label: "Ingresos", value: "INCOME" },
          ]}
          testID="gender-switch-selector"
          accessibilityLabel="gender-switch-selector"
        />
      </View>
      <View className="ml-4 mt-8">
        <Text className="text-base font-medium ">How to much?</Text>
        <View
          style={{
            width: "100%",
            maxWidth: 450,
            height: 100,
            // paddingLeft: 10,
            // paddingRight: 10,
          }}
        >
          <TextInput
            placeholder="0"
            placeholderTextColor={"white"}
            style={{
              fontSize: 100,
              fontWeight: "bold",
              color: "white",
            }}
          />
        </View>
      </View>
      <View
        style={{
          paddingTop: 10,

          // marginBottom: 10,
          marginTop: 40,
          backgroundColor: Colors[theme ?? "light"].background,
        }}
        className="w-full h-full px-4 rounded-t-3xl gap-y-8"
      >
        <View>
          <Text>Category</Text>
        </View>
        {/* titlle */}
        <View
          className={`border  rounded-3xl flex flex-row items-center justify-start `}
          style={{
            width: "100%",
            maxWidth: 450,
            height: 60,
            paddingLeft: 10,
            paddingRight: 10,
            borderColor: Colors[theme ?? "light"].text,
          }}
        >
          <TextInput
            placeholderTextColor={"gray"}
            placeholder="Title"
            style={{
              fontSize: 30,
              color: Colors[theme ?? "light"].text,
            }}
          />
        </View>
        <View
          className={`border  rounded-3xl flex flex-row items-center justify-start `}
          style={{
            width: "100%",
            maxWidth: 450,
            height: 60,
            paddingLeft: 10,
            borderColor: Colors[theme ?? "light"].text,
            paddingRight: 10,
          }}
        >
          <TextInput
            placeholderTextColor={"gray"}
            placeholder="Description"
            style={{
              fontSize: 30,
              color: Colors[theme ?? "light"].text,
            }}
          />
        </View>
        <View
          className={`border  rounded-3xl flex flex-row items-center justify-start `}
          style={{
            width: "100%",
            maxWidth: 450,
            height: 60,
            paddingLeft: 10,
            borderColor: Colors[theme ?? "light"].text,
            paddingRight: 10,
          }}
        >
          <TextInput
            placeholderTextColor={"gray"}
            placeholder="Amount"
            style={{
              fontSize: 30,
              color: Colors[theme ?? "light"].text,
            }}
          />
        </View>
        {/* <RNDateTimePicker mode="time" /> */}
      </View>
    </SafeAreaView>
  );
}
