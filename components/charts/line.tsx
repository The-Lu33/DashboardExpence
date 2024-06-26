import Colors from "@/constants/Colors";
import { NumberFormatter } from "@/utils/formatters";
import { Text, useColorScheme, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
interface LineData {
  value: number;
  date: string;
}
export default function Line({ data }: { data: LineData[] }) {
  const colorScheme = useColorScheme();
  // const data = [
  //   { value: 160, date: "1 Apr 2022" },
  //   { value: 180, date: "2 Apr 2022" },
  //   { value: 190, date: "3 Apr 2022" },
  //   { value: 1180, date: "4 Apr 2022" },
  //   { value: 140, date: "5 Apr 2022" },
  //   { value: 145, date: "6 Apr 2022" },
  //   { value: 160, date: "7 Apr 2022" },
  //   { value: 200, date: "8 Apr 2022" },

  //   { value: 220, date: "9 Apr 2022" },
  //   {
  //     value: 240,
  //     date: "10 Apr 2022",
  //     label: "10 Apr",
  //     labelTextStyle: { color: "lightgray", width: 60 },
  //   },
  //   { value: -50, date: "11 Apr 2022" },
  //   { value: 260, date: "12 Apr 2022" },
  //   { value: 340, date: "13 Apr 2022" },
  //   { value: 385, date: "14 Apr 2022" },
  //   { value: -120, date: "15 Apr 2022" },
  //   { value: 390, date: "16 Apr 2022" },

  //   { value: 370, date: "17 Apr 2022" },
  //   { value: 285, date: "18 Apr 2022" },
  //   { value: 295, date: "19 Apr 2022" },
  //   {
  //     value: 300,
  //     date: "20 Apr 2022",
  //     label: "20 Apr",
  //     labelTextStyle: { color: "lightgray", width: 60 },
  //   },
  //   { value: 280, date: "21 Apr 2022" },
  //   { value: 295, date: "22 Apr 2022" },
  //   { value: 260, date: "23 Apr 2022" },
  //   { value: 255, date: "24 Apr 2022" },

  //   { value: 190, date: "25 Apr 2022" },
  //   { value: 220, date: "26 Apr 2022" },
  //   { value: -500, date: "27 Apr 2022" },
  //   { value: 230, date: "28 Apr 2022" },
  //   { value: 210, date: "29 Apr 2022" },
  //   {
  //     value: 200,
  //     date: "30 Apr 2022",
  //     label: "30 Apr",
  //     labelTextStyle: { color: "lightgray", width: 60 },
  //   },
  //   { value: 240, date: "1 May 2022" },
  //   { value: 250, date: "2 May 2022" },
  //   { value: 280, date: "3 May 2022" },
  //   { value: 250, date: "4 May 2022" },
  //   { value: 210, date: "5 May 2022" },
  // ];

  return (
    <LineChart
      data={data}
        curved
      areaChart
      //   rotateLabel
      //   hideDataPoints
      isAnimated
      animationDuration={3000}
      color="#7F3DFF"
      startFillColor="rgba(139, 80, 255, 0.24)"
      endFillColor="rgba(139, 80, 255, 0)"
      startOpacity={1}
      endOpacity={0.5}
      initialSpacing={0}
      spacing={30}
      thickness={7}
      hideRules
      hideYAxisText
      yAxisThickness={0}
      xAxisThickness={0}
      //   yAxisTextStyle={{color: 'gray'}}
      //   yAxisSide='right'

      hideDataPoints
      noOfSections={6}
      //   maxValue={600}
      yAxisColor="#7F3DFF"
      rulesType="solid"
      rulesColor="gray"
      yAxisTextStyle={{ color: "gray" }}
      //   yAxisSide='right'
      xAxisColor="lightgray"
      pointerConfig={{
        pointerStripHeight: 160,
        pointerStripColor: "lightgray",
        pointerStripWidth: 2,
        pointerColor: "lightgray",
        radius: 6,
        pointerLabelWidth: 100,
        pointerLabelHeight: 90,
        activatePointersOnLongPress: true,
        autoAdjustPointerLabelPosition: false,

        pointerLabelComponent: (
          items: {
            date: string;
            value: string;
          }[]
        ) => {
          return (
            <View
              style={{
                height: 90,
                width: 100,
                justifyContent: "center",
                marginTop: 10,
                marginLeft: -40,
              }}
            >
              <Text
                style={{
                  color: Colors[colorScheme ?? "light"].text,
                  fontSize: 14,
                  marginBottom: 6,
                  textAlign: "center",
                }}
              >
                {items[0].date}
              </Text>

              <View
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderRadius: 16,
                  backgroundColor: "white",
                }}
              >
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  {"$" + NumberFormatter(Number(items[0].value))}
                </Text>
              </View>
            </View>
          );
        },
      }}
    />
  );
}
