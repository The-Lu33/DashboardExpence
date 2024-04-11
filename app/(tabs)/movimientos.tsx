import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "../../components/Themed";
import { NumberFormatter } from "../../utils/formatters";
import { FlatList } from "react-native";

const data = [
  {
    mount: 100,
    date: "01/01/01",
    description: "gasto",
    type: "INGRESO",
    wallet: "binance",
  },
  {
    mount: -1000,
    date: "01/01/01",
    description: "gasto",
    type: "EGRESO",
    wallet: "binance",
  },
  {
    mount: 100,
    date: "01/01/01",
    description: "gasto",
    type: "INGRESO",
    wallet: "binance",
  },
  {
    mount: -1000,
    date: "01/01/01",
    description: "gasto",
    type: "EGRESO",
    wallet: "binance",
  },
  {
    mount: 100,
    date: "01/01/01",
    description: "gasto",
    type: "INGRESO",
    wallet: "binance",
  },
  {
    mount: -1000,
    date: "01/01/01",
    description: "gasto",
    type: "EGRESO",
    wallet: "binance",
  },
  {
    mount: 100,
    date: "01/01/01",
    description: "gasto",
    type: "INGRESO",
    wallet: "binance",
  },
  {
    mount: -1000,
    date: "01/01/01",
    description: "gasto",
    type: "EGRESO",
    wallet: "binance",
  },
  {
    mount: 100,
    date: "01/01/01",
    description: "gasto",
    type: "INGRESO",
    wallet: "binance",
  },
  {
    mount: -1000,
    date: "01/01/01",
    description: "gasto",
    type: "EGRESO",
    wallet: "binance",
  },
  {
    mount: 100,
    date: "01/01/01",
    description: "gasto",
    type: "INGRESO",
    wallet: "binance",
  },
  {
    mount: -1000,
    date: "01/01/01",
    description: "gasto",
    type: "EGRESO",
    wallet: "binance",
  },
  {
    mount: 100,
    date: "01/01/01",
    description: "gasto",
    type: "INGRESO",
    wallet: "binance",
  },
  {
    mount: -1000,
    date: "01/01/01",
    description: "gasto",
    type: "EGRESO",
    wallet: "binance",
  },
  {
    mount: 100,
    date: "01/01/01",
    description: "gasto",
    type: "INGRESO",
    wallet: "binance",
  },
  {
    mount: -1000,
    date: "01/01/01",
    description: "gasto",
    type: "EGRESO",
    wallet: "binance",
  },
  {
    mount: 100,
    date: "01/01/01",
    description: "gasto",
    type: "INGRESO",
    wallet: "binance",
  },
  {
    mount: -1000,
    date: "01/01/01",
    description: "gasto",
    type: "EGRESO",
    wallet: "binance",
  },
  {
    mount: 100,
    date: "01/01/01",
    description: "gasto",
    type: "INGRESO",
    wallet: "binance",
  },
  {
    mount: -1000,
    date: "01/01/01",
    description: "gasto",
    type: "EGRESO",
    wallet: "binance",
  },
  {
    mount: 100,
    date: "01/01/01",
    description: "gasto",
    type: "INGRESO",
    wallet: "binance",
  },
  {
    mount: -1000,
    date: "01/01/01",
    description: "gasto",
    type: "EGRESO",
    wallet: "binance",
  },
];
export default function History() {
  return (
    <SafeAreaView className="flex-1 w-full h-full bg-white dark:bg-black">
      <View className="w-full">
        <View className="flex flex-row justify-between px-2 border-black dark:border-white border-b">
          <Text className="text-base font-normal">Tipo</Text>
          <Text className="text-base font-normal">Fecha</Text>
          <Text className="text-base font-normal">Monto</Text>
        </View>

        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View
              // key={index}
              className={`w-full h-10 flex  flex-row items-center  justify-between px-2 mt-2 `}
            >
              <Text
                className={`font-semibold text-base w-[33%] ${
                  item.type === "INGRESO" ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.type}
              </Text>
              <Text
                className={`font-normal text-sm text-center  w-[33%] ${
                  item.type === "INGRESO" ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.date}
              </Text>
              <Text
                className={`font-semibold text-base text-right w-[33%] ${
                  item.type === "INGRESO" ? "text-green-500" : "text-red-500"
                }`}
              >
                {NumberFormatter(item.mount)}
              </Text>
            </View>
          )}
        />
        <View>
          {/* {data.map((item, index) => (
             
            ))} */}
        </View>
      </View>
    </SafeAreaView>
  );
}
