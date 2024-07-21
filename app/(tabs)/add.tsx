import {
  Image,
  SafeAreaView,
  TextInput,
  View,
  useColorScheme,
  TouchableOpacity,
  Platform,
  Modal,
  TouchableHighlight,
} from "react-native";
import Colors from "@/constants/Colors";
import { Text } from "@/components/Themed";
import SwitchSelector from "react-native-switch-selector";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import moment from "moment";

export default function Add() {
  const theme = useColorScheme();
  const [reportSelect, SetReportSelect] = useState("EXPENSE");
  const [categorySelect, setCategorySelect] = useState("");

  // date state
  const [dateSelect, setDateSelect] = useState(new Date());
  const [showSelectDate, setShowSelectDate] = useState(false);
  //time state
  const [timeSelect, setTimeSelect] = useState(
    moment(new Date()).format("hh:mm A")
  );
  const [showSelectTime, setShowSelectTime] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || dateSelect;
    // setShowSelectDate(Platform.OS === "ios");
    setDateSelect(new Date(currentDate));
  };

  const onChangeAndroid = (e: DateTimePickerEvent, selectDate?: Date) => {
    setShowSelectDate(false);
    if (selectDate) {
      setDateSelect(new Date(selectDate));
    }
  };

  const onChangeTime = (e: DateTimePickerEvent, selectDate?: Date) => {
    const currentDate = selectDate || timeSelect;
    const formattedDate = moment(currentDate).format("hh:mm A");

    setTimeSelect(formattedDate);
  };

  const onChangeTimeAndroid = (e: DateTimePickerEvent, selectDate?: Date) => {
    setShowSelectTime(false);
    if (selectDate) {
      const formateTime = moment(selectDate).format("hh:mm A");
      setTimeSelect(formateTime);
    }
  };
  const renderDatePicker = () => {
    return (
      <>
        <DateTimePicker
          display={Platform.OS === "ios" ? "spinner" : "default"}
          value={dateSelect}
          mode="date"
          minimumDate={new Date(1920, 10, 20)}
          maximumDate={new Date()}
          onChange={Platform.OS === "ios" ? onChange : onChangeAndroid}
        />
      </>
    );
  };

  const convertToISO = (timeString: string): Date => {
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = (parseInt(hours, 10) + 12) as any;
    }

    if (modifier === "AM" && hours === "12") {
      hours = "00";
    }

    const date = new Date();
    date.setHours(hours as unknown as number);
    date.setMinutes(minutes as unknown as number);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  };
  const renderTimePicker = () => {
    return (
      <>
        <DateTimePicker
          display={Platform.OS === "ios" ? "spinner" : "default"}
          mode="time"
          value={convertToISO(timeSelect)}
          minimumDate={new Date(1920, 10, 20)}
          maximumDate={new Date()}
          onChange={Platform.OS === "ios" ? onChangeTime : onChangeTimeAndroid}
        />
      </>
    );
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
          paddingTop: Platform.OS === "android" ? 50 : "auto",
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
      <View className="ml-4 mt-4">
        <Text
          className="text-base font-medium "
          style={{
            marginBottom: Platform.OS === "android" ? 10 : "auto",
            color: "white",
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
          marginTop: 5,
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

            borderColor: Colors[theme ?? "light"].text,
          }}
        >
          <TextInput
            className="rounded-3xl"
            placeholderTextColor={"gray"}
            placeholder="Title"
            style={{
              fontSize: 16,
              color: Colors[theme ?? "light"].text,
              width: "100%",
              height: "100%",
              paddingLeft: 10,
              paddingRight: 10,
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
            className="rounded-3xl"
            placeholderTextColor={"gray"}
            placeholder="Description"
            style={{
              fontSize: 16,
              color: Colors[theme ?? "light"].text,
              width: "100%",
              height: "100%",
              paddingLeft: 10,
              paddingRight: 10,
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
            className="rounded-3xl"
            placeholderTextColor={"gray"}
            placeholder="Amount"
            style={{
              fontSize: 16,
              color: Colors[theme ?? "light"].text,
              width: "100%",
              height: "100%",
              paddingLeft: 10,
              paddingRight: 10,
            }}
          />
        </View>
        {/* picker date */}
        <View
          className="flex   flex-row items-center justify-between"
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            maxWidth: 450,
          }}
        >
          {/* {showSelectDate && ( */}
          <TouchableOpacity onPress={() => setShowSelectDate(!showSelectDate)}>
            <View className="bg-[#7F3DFF] w-44 h-12 rounded-3xl justify-center items-center gap-x-2 flex flex-row ">
              <Image source={require("@/assets/images/calendar-icon.png")} />
              <Text
                style={{
                  color: "white",
                }}
              >
                Seleccionar Fecha
              </Text>
            </View>
          </TouchableOpacity>
          <Text
            className="text-bold text-lg"
            style={{
              color: Colors[theme ?? "light"].text,
            }}
          >
            {dateSelect.toLocaleDateString()}
          </Text>
          {Platform.OS !== "ios" && showSelectDate && renderDatePicker()}
          {Platform.OS === "ios" && showSelectDate && (
            <Modal
              transparent
              animationType="slide"
              visible={showSelectDate}
              supportedOrientations={["portrait"]}
              onRequestClose={() => setShowSelectDate(false)}
            >
              <View className="flex-1">
                <TouchableHighlight
                  underlayColor={"#fff"}
                  className="absolute bottom-0 w-full h-[33%] rounded-t-xl pt-2 bg-white dark:bg-black/90"
                >
                  <View className="">
                    <View>
                      <View className="">{renderDatePicker()}</View>
                    </View>
                    <TouchableHighlight
                      className="absolute left-2 border rounded-lg border-red-500 p-1"
                      underlayColor={"transparent"}
                      onPress={() => {
                        setShowSelectDate(false);
                        setDateSelect(new Date());
                      }}
                    >
                      <Text className="text-base font-semibold text-red-500">
                        Cancel
                      </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      className="absolute right-2 p-1 bg-green-500 rounded-lg"
                      underlayColor={"transparent"}
                      onPress={() => {
                        setShowSelectDate(false);
                      }}
                    >
                      <Text className="text-base font-semibold ">Done</Text>
                    </TouchableHighlight>
                  </View>
                </TouchableHighlight>
              </View>
            </Modal>
          )}
        </View>
        <View
          className="flex   flex-row items-center justify-between"
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            maxWidth: 450,
          }}
        >
          {/* {showSelectDate && ( */}
          <TouchableOpacity onPress={() => setShowSelectTime(!showSelectTime)}>
            <View className="bg-[#FCAC12] w-44 h-12 rounded-3xl justify-center items-center gap-x-2 flex flex-row ">
              <Image source={require("@/assets/images/time-icon.png")} />
              <Text
                style={{
                  color: "white",
                }}
              >
                Seleccionar Hora
              </Text>
            </View>
          </TouchableOpacity>
          <Text
            className="text-bold text-lg"
            style={{
              color: Colors[theme ?? "light"].text,
            }}
          >
            {timeSelect}
          </Text>
          {Platform.OS !== "ios" && showSelectTime && renderTimePicker()}
          {Platform.OS === "ios" && showSelectTime && (
            <Modal
              transparent
              animationType="slide"
              visible={showSelectTime}
              supportedOrientations={["portrait"]}
              onRequestClose={() => setShowSelectTime(false)}
            >
              <View className="flex-1">
                <TouchableHighlight
                  underlayColor={"#fff"}
                  className="absolute bottom-0 w-full h-[33%] rounded-t-xl pt-2 bg-white dark:bg-black/90"
                >
                  <View className="">
                    <View>
                      <View className="">{renderTimePicker()}</View>
                    </View>
                    <TouchableHighlight
                      className="absolute left-2 border rounded-lg border-red-500 p-1"
                      underlayColor={"transparent"}
                      onPress={() => {
                        setShowSelectTime(false);
                        setTimeSelect(moment(new Date()).format("hh:mm A"));
                      }}
                    >
                      <Text className="text-base font-semibold text-red-500">
                        Cancel
                      </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      className="absolute right-2 p-1 bg-green-500 rounded-lg"
                      underlayColor={"transparent"}
                      onPress={() => {
                        setShowSelectTime(false);
                      }}
                    >
                      <Text className="text-base font-semibold ">Done</Text>
                    </TouchableHighlight>
                  </View>
                </TouchableHighlight>
              </View>
            </Modal>
          )}
        </View>
        <TouchableOpacity>
          <View
            className="mx-auto w-full h-12 items-center justify-center rounded-2xl"
            style={{
              backgroundColor:
                reportSelect === "EXPENSE" ? "#ef4444" : "#22c55e",
            }}
          >
            <Text className="text-lg font-bold text-white">Agregar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
