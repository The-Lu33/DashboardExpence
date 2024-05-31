import Colors from "@/constants/Colors";
import { ItemMovementInterface } from "@/types/types";
import { Image, Text, useColorScheme, View } from "react-native";
interface CategoryColorsAndIcons {
  bg: string;
  icon: any; // Ajusta el tipo de datos del icono según tu estructura de archivos
}

export default function ItemMovement({
  category,
  typeMove,
  description,
  mount,
  time,
}: ItemMovementInterface) {
  const theme = useColorScheme();

  const colorsAndIcons: { [key: string]: any } = {
    INCOME: {
      FREELANCE: {
        bg: "#8cfcd3",
        icon: require("@/assets/images/freelance.png"),
      },
      SALARY: {
        bg: "#8cfcd3",
        icon: require("@/assets/images/salary.png"),
      },
    },
    EXPENSE: {
      SHOPPING: {
        bg: "#fcedd1",
        icon: require("@/assets/images/shopping.png"),
      },
      FOOD: {
        bg: "#fed5d7",
        icon: require("@/assets/images/food.png"),
      },
      TRANSPORTATION: {
        bg: "#BDDCFF",
        icon: require("@/assets/images/car.png"),
      },
      SUBSCRIPTION: {
        bg: "#CAAEFF",
        icon: require("@/assets/images/subscription.png"),
      },
    },
  };
  const icon = colorsAndIcons[typeMove][category].icon;
  // console.log(colorsAndIcons[typeMove][category].bg);
  return (
    <View className="flex-row justify-between w-full px-2 my-2">
      <View className="flex-row ">
        <View
          className={`p-3 w-14 justify-center items-center rounded-2xl  mr-2`}
          style={{
            backgroundColor: colorsAndIcons[typeMove][category].bg,
          }}
        >
          <Image source={icon} />
        </View>
        <View className="text-start flex-col justify-evenly">
          <Text
            className="font-semibold text-lg"
            style={{
              color: Colors[theme ?? "light"].text,
            }}
          >
            {category}
          </Text>
          <Text
            className="font-medium text-sm"
            style={{
              color: Colors[theme ?? "light"].text,
            }}
          >
            {description}
          </Text>
        </View>
      </View>
      <View className="text-end flex-col justify-evenly">
        <Text
          className={`${
            typeMove === "EXPENSE" ? "text-[#fd3c4a]" : "text-[#00a86b]"
          } font-semibold text-base`}
        >
          ${mount}
        </Text>
        <Text
          className="text-xs font-normal"
          style={{
            color: Colors[theme ?? "light"].text,
          }}
        >
          {time} AM
        </Text>
      </View>
    </View>
  );
}
