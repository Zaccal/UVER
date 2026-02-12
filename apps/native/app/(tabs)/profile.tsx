import { Container } from "@/components/container";
import ResumeCard from "@/components/ResumeCard";
import { fallbackAvatarGenrator } from "@/utils/utils";
import { authClient } from "@/lib/auth-client";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Avatar, Button, useThemeColor } from "heroui-native";
import React from "react";
import { Text, View } from "react-native";

const FALLBACK_AVATAR_URL =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic-cse.canva.com%2Fblob%2F935464%2F1600w-HdnNPtnguw4.jpg&f=1&nofb=1";

export default function Profile() {
  const colorAccent = useThemeColor("accent");
  const router = useRouter();
  const foreground = useThemeColor("foreground");
  const { data: session } = authClient.useSession();

  const userName = session?.user?.name ?? "Guest";
  const userEmail = session?.user?.email ?? "example@mail.com";
  const avatarImage = session?.user?.image ?? FALLBACK_AVATAR_URL;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Container className={"pt-16 bg-background"}>
        <View className="flex-row items-center justify-between mb-4">
          <Button isIconOnly variant="ghost" onPress={() => router.back()}>
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color={foreground}
            />
          </Button>
          <Button isIconOnly variant="ghost">
            <Ionicons
              name="notifications-outline"
              size={24}
              color={foreground}
            />
          </Button>
        </View>
        <View className="flex-row items-center gap-3">
          <Avatar alt={userName} size="lg">
            <Avatar.Image source={{ uri: avatarImage }} />
            <Avatar.Fallback>{fallbackAvatarGenrator(userName)}</Avatar.Fallback>
          </Avatar>
          <View>
            <Text className="text-foreground font-semibold text-xl">
              {userName}
            </Text>
            <Text className="text-gray-400 light:text-gray-700 text-sm">
              {userEmail}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between mt-8">
          <Text className="text-foreground font-semibold text-lg">
            My resumes
          </Text>
          <Button size="sm" variant="ghost">
            <Ionicons color={colorAccent} name="add-outline" size={20} />
            <Button.Label className="text-accent">Create a resume</Button.Label>
          </Button>
        </View>
        <View className="mt-4">
          <ResumeCard
            title="Resume #1"
            description="Lorem lorem lorem lorem lorem lorem lorem"
          />
        </View>
      </Container>
    </>
  );
}
