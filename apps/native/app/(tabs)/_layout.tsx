import Header from "@/components/header";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useThemeColor } from "heroui-native";

export default function TabLayout() {
  const themeColorForeground = useThemeColor("foreground");
  const themeColorBackground = useThemeColor("background");

  return (
    <>
      <Tabs
        screenOptions={{
          header: () => <Header />,
          tabBarStyle: {
            backgroundColor: themeColorBackground,
          },
          headerTintColor: themeColorForeground,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: "Explore",
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="compass" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
