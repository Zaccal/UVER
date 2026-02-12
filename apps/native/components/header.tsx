import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar, useThemeColor } from "heroui-native";

import { fallbackAvatarGenrator } from "@/utils/utils";
import { authClient } from "@/lib/auth-client";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeToggle } from "./theme-toggle";

const FALLBACK_AVATAR_URL =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic-cse.canva.com%2Fblob%2F935464%2F1600w-HdnNPtnguw4.jpg&f=1&nofb=1";

export default function Header() {
  const { top } = useSafeAreaInsets();
  const themeColorForeground = useThemeColor("foreground");
  const { data: session } = authClient.useSession();

  const userName = session?.user?.name ?? "Guest";
  const avatarImage = session?.user?.image ?? FALLBACK_AVATAR_URL;

  return (
    <View
      className="bg-background flex-row items-center justify-between"
      style={{
        paddingTop: top,
        paddingBottom: 32,
        paddingHorizontal: 16,
      }}
    >
      <View className="flex-row items-center gap-3">
        <Avatar alt={userName} size="sm">
          <Avatar.Image source={{ uri: avatarImage }} />
          <Avatar.Fallback>{fallbackAvatarGenrator(userName)}</Avatar.Fallback>
        </Avatar>

        <Text className="text-foreground text-base">Hello, {userName}</Text>
      </View>

      <View className="flex-row items-center gap-3">
        <Pressable className="h-10 w-10 items-center justify-center rounded-full">
          <FontAwesome size={20} name="bell" color={themeColorForeground} />
        </Pressable>
        <ThemeToggle />
      </View>
    </View>
  );
}
