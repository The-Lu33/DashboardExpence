import { BlurView } from "expo-blur";
import { ReactNode, useEffect } from "react";
import { BackHandler, TouchableOpacity, useColorScheme } from "react-native";
import { View } from "react-native";
import { Text } from "../Themed";

interface AlertUIInterface {
  onClose: () => void;
  TEXT: string;
  ICON?: ReactNode;
  COLOR: string;
}

export default function AlertUI({
  onClose,
  TEXT,
  COLOR,
  ICON,
}: AlertUIInterface) {
  const theme = useColorScheme();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        onClose(); // Cierra el modal cuando se presiona el botón de retroceso
        return true; // Evita que la acción predeterminada del botón de retroceso ocurra (por ejemplo, salir de la aplicación)
      }
    );

    return () => {
      backHandler.remove(); // Limpia el event listener cuando el componente se desmonta
    };
  }, [onClose]);
  return (
    <>
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BlurView
          intensity={70}
          blurReductionFactor={100}
          tint="dark"
          experimentalBlurMethod="dimezisBlurView"
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={onClose}
            activeOpacity={1}
          />
          <View
            style={{
              width: 300,
              height: 200,
              backgroundColor: theme === "light" ? "white" : "#373636",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
            }}
          >
            {ICON && ICON}
            <Text className={`text-[${COLOR}] font-bold text-xl`}>{TEXT}</Text>
          </View>
        </BlurView>
      </View>
    </>
  );
}
