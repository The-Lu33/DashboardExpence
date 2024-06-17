import { FlatList, Text, View } from "react-native";
import ItemMovement from "./item-movement";
import { ItemMovementInterface } from "@/types/types";
import data from "@/utils/example/data.json";
export default function RecentMovement() {
  const movement: ItemMovementInterface[] = data as ItemMovementInterface[];

  return (
    <View style={{ flex: 1, height: "100%" }}>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
        Recent Transactions
      </Text>
      <FlatList
        data={movement}
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
}
