import { useColorScheme, Text } from "react-native";
import { PieChart, PieChartPro } from "react-native-gifted-charts";
import { View } from "../Themed";
import { NumberFormatter } from "@/utils/formatters";
type PieDataItem = {
  category: string;
  value: number;
  color: string;
  gradientCenterColor: string;
  focused?: boolean;
};
export default function Pie({
  data,
  total,
}: {
  data: PieDataItem[];
  total: number;
}) {
  const pieData = data.map((item) => ({
    ...item,
    value: Math.abs(item.value),
  }));
  const renderDot = (color: string) => {
    return (
      <View
        style={{
          height: 14,
          width: 14,
          borderRadius: 7,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot("#006DFF")}
            <Text className="font-semibold">Excellent: 47%</Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot("#8F80F3")}
            <Text className="font-semibold">Okay: 16%</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot("#3BE9DE")}
            <Text className="font-semibold">Good: 40%</Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot("#FF7F97")}
            <Text className="font-semibold">Poor: 3%</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View className="r px-4 py-2">
      <View style={{ padding: 20, alignItems: "center" }}>
        <PieChart
          data={pieData}
          strokeColor="white"
          strokeWidth={1}
          donut
          showGradient
          sectionAutoFocus
          // focusOnPressinnerCircleColor="#414141"
          innerCircleBorderWidth={1}
          innerCircleBorderColor={"white"}
          radius={120}
          innerRadius={60}
          innerCircleColor={"white"}
          centerLabelComponent={() => {
            return (
              <Text className="font-bold text-xl">
                {NumberFormatter(total)}$
              </Text>
            );
          }}
        />
      </View>
      {/* {renderLegendComponent()} */}
    </View>
  );
}
