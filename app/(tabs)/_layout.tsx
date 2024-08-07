import { Tabs } from "expo-router";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import Colors from "@/constants/Colors";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome6,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import MyTabBar from "@/components/tabs/index";
import Avatar from "@/components/ui/avatar";
import { Text } from "@/components/Themed";
import useAuth from "@/hooks/useAuth";
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tabs = {
    Inicio: {
      labelStyle: {
        color: "#5B37B7",
      },
      icon: {
        // component: /* ICON COMPONENT */,
        activeColor: "#5B37F3",
        inactiveColor: "rgba(0,0,0,1)",
      },
      background: {
        activeColor: "#5812DC",
        inactiveColor: "#6534C2",
      },
    },
    Transacciones: {
      icon: {
        // component: /* ICON COMPONENT */,
        activeColor: "rgba(17,148,170,1)",
        inactiveColor: "rgba(0,0,0,1)",
      },
      background: {
        activeColor: "#D34300",
        inactiveColor: "#BC4C17",
      },
    },
    add: {
      icon: {
        // component: /* ICON COMPONENT */,
        activeColor: "rgba(17,148,170,1)",
        inactiveColor: "rgba(0,0,0,1)",
      },
      background: {
        activeColor: "#FCAC12",
        inactiveColor: "#FFC350",
      },
    },
    Report: {
      icon: {
        // component: /* ICON COMPONENT */,
        activeColor: "rgba(17,148,170,1)",
        inactiveColor: "rgba(0,0,0,1)",
      },
      background: {
        activeColor: "#FCAC12",
        inactiveColor: "#FFC350",
      },
    },
    Perfil: {
      icon: {
        // component: /* ICON COMPONENT */,
        activeColor: "rgba(17,148,170,1)",
        inactiveColor: "rgba(0,0,0,1)",
      },
      background: {
        activeColor: "#7F3DFF",
        inactiveColor: "#A87AFF",
      },
    },
  };
  const { user } = useAuth();
  console.log(user);
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      })}
      tabBar={(props) => <MyTabBar tabs={tabs} {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => {
            return <FontAwesome size={25} name="home" color={color} />;
          },
          headerRight: () => (
            <View
              className="flex-row gap-4 items-center justify-center "
              style={{ backgroundColor: "none" }}
            >
              <Text className="font-semibold text-white">
                {user?.name} {user?.last_name}
              </Text>
              {user?.img ? (
                <Avatar
                  // urlImg="https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                  source={{
                    uri: "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
                  }}
                  style={{
                    marginRight: 12,
                    width: 40,
                    height: 40,
                  }}
                />
              ) : (
                <FontAwesome
                  name="user-circle-o"
                  size={32}
                  color="white"
                  style={{
                    marginRight: 12,
                    width: 32,
                    height: 32,
                  }}
                />
              )}
            </View>
          ),
          headerTitleStyle: {
            display: "none",
          },
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].header,
          },
          headerShadowVisible: false,
          // headerShown: false,
          // headerTitleAllowFontScaling: false,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transacciones",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="clock-o" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
          },
          headerTitleStyle: {
            display: "none",
          },
          headerShadowVisible: false,
          headerShown: false,
          headerTitleAllowFontScaling: false,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "add",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="add" size={35} color={color} />
          ),
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
          },
          headerTitleStyle: {
            display: "none",
          },
          headerShadowVisible: false,
          headerShown: false,
          headerTitleAllowFontScaling: false,
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: "Report",
          tabBarIcon: ({ color }) => (
            <AntDesign name="piechart" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
          },
          headerTitleStyle: {
            display: "none",
          },
          headerShadowVisible: false,
          headerShown: false,
          headerTitleAllowFontScaling: false,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
          },
          headerTitleStyle: {
            display: "none",
          },
          headerShadowVisible: false,
          headerShown: false,
          headerTitleAllowFontScaling: false,
        }}
      />
    </Tabs>
  );
}
