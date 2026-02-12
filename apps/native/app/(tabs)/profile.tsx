import { Container } from "@/components/container";
import ResumeCard from "@/components/ResumeCard";
import { fallbackAvatarGenrator } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Avatar, Button, useThemeColor } from "heroui-native";
import React from "react";
import { Text, View } from "react-native";

const AVATAR_URL =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic-cse.canva.com%2Fblob%2F935464%2F1600w-HdnNPtnguw4.jpg&f=1&nofb=1";

export default function Profile() {
  const colorAccent = useThemeColor("accent");
  const router = useRouter();
  const foreground = useThemeColor("foreground");

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
          <Avatar alt="John" size="lg">
            <Avatar.Image source={{ uri: AVATAR_URL }} />
            <Avatar.Fallback>{fallbackAvatarGenrator("John")}</Avatar.Fallback>
          </Avatar>
          <View>
            <Text className="text-foreground font-semibold text-xl">John</Text>
            <Text className="text-gray-400 light:text-gray-700 text-sm">
              examplemail@mail.ru
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
