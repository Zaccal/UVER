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
          headerShown: true,
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
            title: "Search",
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="search" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="applications"
          options={{
            title: "Applications",
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="document-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
