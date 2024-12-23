import React from "react";
import { ItemMovementInterface } from "@/types/types";
import ItemMovement from "@/components/movement/item-movement";
import { FlatList } from "react-native";
import { Text, View } from "@/components/Themed";


export default function TransactionsAll({
  transactions,
}: {
  transactions: ItemMovementInterface[];
}) {
  // Convertir las fechas en timestamps UNIX y ordenar los elementos por fecha
  const sortedByDate = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Agrupar los elementos por fecha
  const groupedByDate: Record<string, ItemMovementInterface[]> = {};
  sortedByDate.forEach((item) => {
    const date = item.date;
    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }
    groupedByDate[date].push(item);
  });

  // Renderizar cada grupo con título de fecha
  const renderGroup = ({
    item,
  }: {
    item: [string, ItemMovementInterface[]];
  }) => (
    <View className="px-2">
      <Text>{item[0] as string}</Text>
      <FlatList
        data={item[1]}
        renderItem={({ item }) => (
          <ItemMovement
            type_move={item.type_move}
            id={item.id}
            category={item.category}
            description={item.description}
            mount={item.mount}
            time={item.time}
            date={item.date}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );

  // Renderizar la lista agrupada
  return (
    // <SafeAreaView className="h-screen" style={{ flex: 1, height: "100%" }}>
      <FlatList
        data={Object.entries(groupedByDate)}
        renderItem={renderGroup}
        keyExtractor={(item) => item[0]}
       
      />
    // </SafeAreaView>
  );
}

