import {  useColorScheme } from "react-native";
import { PieChart, PieChartPro } from "react-native-gifted-charts";
import { Text ,View} from "../Themed";

export default function Pie() {
  const pieData = [
    {
      value: 47,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
      focused: true,
    },
    { value: 40, color: "#93FCF8", gradientCenterColor: "#3BE9DE" },
    { value: 16, color: "#BDB2FA", gradientCenterColor: "#8F80F3" },
    { value: 3, color: "#FFA5BA", gradientCenterColor: "#FF7F97" },
  ];

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
  
      <View
        
        className="border-red-500 border px-4 py-2"
      >
     
        <View style={{ padding: 20, alignItems: "center" }}>
          <PieChart
            data={pieData}
            donut
            showGradient
            // sectionAutoFocus
            focusOnPress
            radius={90}
            innerRadius={55}
            innerCircleColor={"#232B5D"}
            centerLabelComponent={() => {
              return (
                
                  <Text
                    className="font-bold text-base"
                  >
                    500.000,00$
                  </Text>
                 
              );
            }}
          />
        </View>
        {renderLegendComponent()}
    </View>
  );
}
