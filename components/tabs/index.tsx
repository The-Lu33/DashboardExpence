import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Easing } from "react-native-reanimated";

function MyTabBar({ state, descriptors, navigation, tabs }: any) {
  const [tab, setTab] = useState("Inicio");
  const [bg, setBg] = useState(new Animated.Value(0));
  const [textScale, setTextScale] = useState(new Animated.Value(1));
  const [iconScale, setIconScale] = useState(new Animated.Value(1));
  useEffect(() => {
    // Agregar una animación para el fondo
    Animated.timing(bg, {
      toValue: 1,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();

    // Agregar una animación para la escala del texto
    Animated.timing(textScale, {
      toValue: 1, // Escala deseada cuando está seleccionado
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(iconScale, {
      toValue: 1, // Escala deseada cuando está seleccionado
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [bg, textScale, iconScale]);

  const handlePressIn = () => {
    setBg(new Animated.Value(0.5)); // Cambia el valor inicial para la animación
  };

  const handlePressOut = () => {
    Animated.timing(bg, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View
      style={{
        width: "100%",
        height: 55,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: bg.interpolate({
          inputRange: [0.5, 1],
          outputRange: [
            tabs[tab].background.inactiveColor,
            tabs[tab].background.activeColor,
          ],
        }),
      }}
    >
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          setTab(label);

          if (!isFocused && !event.defaultPrevented) {
            setBg(new Animated.Value(0));

            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {options.tabBarIcon && (
              <Animated.View
                style={{
                  transform: [{ scale: isFocused ? iconScale : 0.8 }],
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <options.tabBarIcon color={isFocused ? "white" : "gray"} />
                {isFocused && (
                  <Animated.Text
                    style={{
                      color: "white",
                      transform: [{ scale: isFocused ? textScale : 0.8 }],
                    }}
                  >
                    {label}
                  </Animated.Text>
                )}
              </Animated.View>
            )}
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}

export default MyTabBar;
