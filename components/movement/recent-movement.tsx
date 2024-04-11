import { FlatList, Text, View } from "react-native";
import ItemMovement from "./item-movement";
import { ItemMovementInterface } from "@/types/types";

export default function RecentMovement() {
  const movement: ItemMovementInterface[] = [
    {
      id: "2",
      typeMove: "INCOME",
      category: "FREELANCE",
      description: "Software",
      mount: 500,
      time: "05:00",
    },
    {
      id: "1",
      typeMove: "EXPENSE",
      category: "SHOPPING",
      description: "Lenceria",
      mount: -20.0,
      time: "10:00",
    },

    {
      id: "4",
      typeMove: "EXPENSE",
      category: "FOOD",
      description: "Chuleta",
      mount: -20.0,
      time: "10:00",
    },
    {
      id: "5",
      typeMove: "INCOME",
      category: "FREELANCE",
      description: "Software",
      mount: 500,
      time: "05:00",
    },
    {
      id: "6",
      typeMove: "EXPENSE",
      category: "SHOPPING",
      description: "Lenceria",
      mount: -20.0,
      time: "10:00",
    },

    {
      id: "3",
      typeMove: "EXPENSE",
      category: "FOOD",
      description: "Chuleta",
      mount: -20.0,
      time: "10:00",
    },
  ];

  return (
    <View style={{ flex: 1, height: "100%" }}>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
        Recent Transactions
      </Text>
      <FlatList
        data={movement}
        renderItem={({ item }) => (
          <ItemMovement
            typeMove={item.typeMove}
            id={item.id}
            category={item.category}
            description={item.description}
            mount={item.mount}
            time={item.time}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
