import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../pages/app/HomeScreen";
import { SettingsScreen } from "../pages/app/SettingsScreen";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from "react-native";

const Tab = createBottomTabNavigator();

export function TabRoute() {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "flex", backgroundColor: "#dcddc" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo name="home" size={24} color={focused ? "#000" : "#888"} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "#000" : "#888", fontSize: 14 }}>
              Início
            </Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons name="settings" size={24} color={focused ? "#000" : "#888"} />
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "#000" : "#888", fontSize: 14 }}>
                Configurações
              </Text>
            ),
          }}
      />
    </Tab.Navigator>
  );
}
