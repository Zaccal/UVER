import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar, useThemeColor } from "heroui-native";

import { Container } from "./container";
import { fallbackAvatarGenrator } from "@/utils/utils";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const AVATAR_URL =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic-cse.canva.com%2Fblob%2F935464%2F1600w-HdnNPtnguw4.jpg&f=1&nofb=1";

const HEADER_HEIGHT = 100;

export default function Header() {
  const { top } = useSafeAreaInsets();
  const themeColorForeground = useThemeColor("foreground");

  return (
    <View
      className="bg-background flex-row items-center justify-between"
      style={{
        paddingTop: top,
        paddingBottom: 24,
        paddingHorizontal: 16,
      }}
    >
      <View className="flex-row items-center gap-3">
        <Avatar alt="John" size="sm">
          <Avatar.Image source={{ uri: AVATAR_URL }} />
          <Avatar.Fallback>{fallbackAvatarGenrator("John")}</Avatar.Fallback>
        </Avatar>

        <Text className="text-foreground text-base">
          Hello, <Text className="font-semibold">John</Text>
        </Text>
      </View>

      <Pressable className="h-10 w-10 items-center justify-center rounded-full">
        <FontAwesome size={20} name="bell" color={themeColorForeground} />
      </Pressable>
    </View>
  );
}
