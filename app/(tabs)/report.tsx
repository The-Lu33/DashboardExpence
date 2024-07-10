import TransactionsAll from "@/components/movement/transactions-all";
import { Text, View } from "@/components/Themed";
import data from "@/utils/example/data.json";

import { ItemMovementInterface } from "@/types/types";
import { useMemo, useState } from "react";
import SwitchSelector from "react-native-switch-selector";
import { SafeAreaView, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import Pie from "@/components/charts/pie";
type PieDataItem = {
  category: string;
  value: number;
  color: string;
  gradientCenterColor: string;
  focused?: boolean;
};
type GroupedDataResult = {
  pieData: PieDataItem[];
  total: number;
};

export default function Report() {
  const theme = useColorScheme();

  const [reportSelect, SetReportSelect] = useState("EXPENSE");
  const groupAndSumByCategory = (
    data: ItemMovementInterface[],
    type_move: "INCOME" | "EXPENSE"
  ): GroupedDataResult => {
    const result: { [key: string]: PieDataItem } = {};
    let total = 0;

    data
      .filter((item) => item.type_move === type_move)
      .forEach((item) => {
        const key = item.category;
        if (!result[key]) {
          result[key] = {
            category: key,
            value: 0,
            color: "", // Asigna un color a cada categoría
            gradientCenterColor: "", // Asigna un color de gradiente a cada categoría
          };
        }
        result[key].value += item.mount; // Sumar los montos con su signo original
        total += item.mount; // Sumar el monto al total
      });

    // Asigna colores específicos a cada categoría
    const categoryColors: {
      [key: string]: { color: string; gradientCenterColor: string };
    } = {
      FREELANCE: { color: "#32393F", gradientCenterColor: "#32393F" },
      SALARY: { color: "#00A86B", gradientCenterColor: "#00A86B" },
      SHOPPING: { color: "#FCAC12", gradientCenterColor: "#FCAC12" },
      FOOD: { color: "#FD3C4A", gradientCenterColor: "#FD3C4A" },
      SUBSCRIPTION: { color: "#CEB5FD", gradientCenterColor: "#CEB5FD" },
      TRANSPORTATION: { color: "#0077FF", gradientCenterColor: "#0077FF" },
      // Agrega más categorías si es necesario
    };

    const pieData = Object.keys(result).map((category) => ({
      category,
      value: result[category].value,
      color: categoryColors[category]?.color || "#cccccc",
      gradientCenterColor:
        categoryColors[category]?.gradientCenterColor || "#cccccc",
    }));

    return { pieData, total };
  };

  const { pieData, total } = useMemo(
    () => groupAndSumByCategory(data, reportSelect as "INCOME" | "EXPENSE"),
    [reportSelect]
  );
  const renderDot = (color: string) => {
    return (
      <View
        style={{
          height: 14,
          width: 14,
          borderRadius: 7,
          backgroundColor: color,
          marginRight: 8,
        }}
      />
    );
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors[theme ?? "light"].background,
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
      <Pie data={pieData} total={total} />

      {pieData.map((item, index) => {
        let w = Math.abs((item.value / total) * 100);
        return (
          <View key={index} className="flex justify-center mt-4">
            <View className="flex flex-row justify-between items-center px-3">
              <View className="flex-row flex items-center ">
                {renderDot(item.color)}
                <Text className="font-bold text-base ">{item.category}</Text>
              </View>
              <Text
                className={`${
                  reportSelect === "EXPENSE"
                    ? "text-[#fd3c4a]"
                    : "text-[#00a86b]"
                } font-bold text-base`}
              >
                {item.value}$
              </Text>
            </View>
            <View className="flex w-full px-3 justify-center mt-2">
              <View className="w-full h-5 border rounded-md border-gray-300/50">
                <View
                  className="h-full rounded-md"
                  style={{
                    backgroundColor: item.color,
                    width: `${w}%`,
                  }}
                />
              </View>
            </View>
          </View>
        );
      })}
    </SafeAreaView>
  );
}
