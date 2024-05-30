import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, BackHandler } from "react-native";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface FILTER {
  label: string;
  option: string;
}

interface FilterSelectorProps {
  onClose: () => void;
  onSelectFilter: (category: string) => void;
  filter: FILTER[];
  selectedFilters: string[];
}

export default function FilterSelector({
  onClose,
  onSelectFilter,
  filter,
  selectedFilters,
}: FilterSelectorProps) {

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
          <View style={{ width: 300, height: 300, backgroundColor: "white" }}>
            <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
              {filter.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: 8,
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    marginVertical: 4,
                    marginHorizontal: 4,
                    backgroundColor: selectedFilters.includes(item.option)
                      ? "green"
                      : "transparent",
                  }}
                  onPress={() => onSelectFilter(item.option)}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </BlurView>
      </View>
    </>
  );
}
