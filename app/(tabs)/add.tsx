import {
  Image,
  SafeAreaView,
  TextInput,
  View,
  useColorScheme,
  TouchableOpacity,
  Platform,
} from "react-native";
import Colors from "@/constants/Colors";
import { Text } from "@/components/Themed";
import SwitchSelector from "react-native-switch-selector";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
export default function Add() {
  const theme = useColorScheme();
  const [reportSelect, SetReportSelect] = useState("EXPENSE");
  const [categorySelect, setCategorySelect] = useState("");
  const [dateSelect, setDateSelect] = useState(new Date());
  const [showSelectDate, setShowSelectDate] = useState(false);
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || dateSelect;
    // setShowSelectDate(Platform.OS === "ios");
    setDateSelect(currentDate);
    setShowSelectDate(false); // Opcional: ocultar el DateTimePicker después de seleccionar una fecha
  };
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
            fontSize: 16,
            fontWeight: "bold",
          }}
          options={[
            { label: "Gasto", value: "EXPENSE" },
            { label: "Ingreso", value: "INCOME" },
          ]}
          testID="gender-switch-selector"
          accessibilityLabel="gender-switch-selector"
        />
      </View>
      <View className="ml-4 mt-8">
        <Text
          className="text-base font-medium "
          style={{
            marginBottom: Platform.OS === "android" ? 10 : "auto",
          }}
        >
          How to much?
        </Text>
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
        className="w-full h-full px-4 rounded-t-3xl gap-y-5"
      >
        <View
          className={`border  rounded-3xl items-center justify-start `}
          style={{
            width: "100%",
            maxWidth: 450,
            height: 50,
            // paddingLeft: 10,
            borderColor: Colors[theme ?? "light"].text,
            paddingRight: 10,
          }}
        >
          {/* <Text>Category</Text> */}
          <RNPickerSelect
            onValueChange={(value) => {
              console.log(value);
              setCategorySelect(value);
            }}
            items={[
              { label: "Food", value: "FOOD" },
              { label: "Shopping", value: "SHOPPING" },
              { label: "Service", value: "SERVICE" },
              { label: "job", value: "JOB" },
              { label: "Others", value: "OTHERS" },
              { label: "Freelance", value: "FREELANCE" },
            ]}
            value={categorySelect}
            placeholder={{
              label: "Categoría...",
              value: null,
              color: Colors[theme ?? "light"].placeholder,
            }}
            style={{
              inputIOS: {
                fontSize: 16,
                height: "100%",
                paddingLeft: 10,
                color: Colors[theme ?? "light"].text,
                // opacity: 0.5,
              },
              inputAndroid: {
                fontSize: 16,
                height: "100%",
                color: Colors[theme ?? "light"].text,
                // opacity: 0.5,/
              },
            }}
          />
        </View>

        {/* title */}
        <View
          className={`border rounded-3xl flex flex-row items-center justify-start `}
          style={{
            width: "100%",
            maxWidth: 450,
            height: 50,
            paddingLeft: 10,
            paddingRight: 10,
            borderColor: Colors[theme ?? "light"].text,
          }}
        >
          <TextInput
            placeholderTextColor={"gray"}
            placeholder="Title"
            style={{
              fontSize: 16,
              color: Colors[theme ?? "light"].text,
            }}
          />
        </View>
        <View
          className={`border  rounded-3xl flex flex-row items-center justify-start `}
          style={{
            width: "100%",
            maxWidth: 450,
            height: 50,
            paddingLeft: 10,
            borderColor: Colors[theme ?? "light"].text,
            paddingRight: 10,
          }}
        >
          <TextInput
            placeholderTextColor={"gray"}
            placeholder="Description"
            style={{
              fontSize: 16,
              color: Colors[theme ?? "light"].text,
            }}
          />
        </View>
        <View
          className={`border  rounded-3xl flex flex-row items-center justify-start `}
          style={{
            width: "100%",
            maxWidth: 450,
            height: 50,
            paddingLeft: 10,
            borderColor: Colors[theme ?? "light"].text,
            paddingRight: 10,
          }}
        >
          <TextInput
            placeholderTextColor={"gray"}
            placeholder="Amount"
            style={{
              fontSize: 16,
              color: Colors[theme ?? "light"].text,
            }}
          />
        </View>
        {/* picker date */}
        <View
          className="flex flex-row items-center justify-between"
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            maxWidth: 450,
          }}
        >
          <TouchableOpacity onPress={() => setShowSelectDate(!showSelectDate)}>
            <View className="bg-[#7F3DFF] w-44 h-12 rounded-3xl justify-center items-center gap-x-2 flex flex-row ">
              <Image source={require("@/assets/images/calendar-icon.png")} />
              <Text
                style={{
                  color: Colors[theme ?? "light"].text,
                }}
              >
                Seleccionar Fecha
              </Text>
            </View>
          </TouchableOpacity>
          {/* {showSelectDate && ( */}
          <RNDateTimePicker
            value={dateSelect}
            onChange={onChange}
            mode="date"
            maximumDate={new Date()}
            testID={"dateTimePicker"}
            style={{
              backgroundColor: "red",
            }}
            // themeVariant={theme === "light" ? "light" : "dark"}
          />
          {/* )} */}
          <Text
            className="text-bold text-lg"
            style={{
              color: Colors[theme ?? "light"].text,
            }}
          >
            {dateSelect.toLocaleDateString()}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
