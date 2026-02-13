import { Container } from "@/components/container";
import ResumeCard from "@/components/ResumeCard";
import { fallbackAvatarGenrator } from "@/utils/utils";
import { authClient } from "@/lib/auth-client";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Avatar, Button, Surface, useThemeColor } from "heroui-native";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

const FALLBACK_AVATAR_URL =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic-cse.canva.com%2Fblob%2F935464%2F1600w-HdnNPtnguw4.jpg&f=1&nofb=1";

export default function Profile() {
  const colorAccent = useThemeColor("accent");
  const router = useRouter();
  const foreground = useThemeColor("foreground");
  const { data: session } = authClient.useSession();
  const dangerColor = useThemeColor("danger");

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const userName = session?.user?.name ?? "Guest";
  const userEmail = session?.user?.email ?? "example@mail.com";
  const avatarImage = session?.user?.image ?? FALLBACK_AVATAR_URL;

  async function handleSignOut() {
    setIsMenuOpen(false);
    await authClient.signOut();
    router.replace("/(auth)" as never);
  }

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
          <Button
            isIconOnly
            variant="ghost"
            onPress={() => setIsMenuOpen(true)}
          >
            <Ionicons name="ellipsis-vertical" size={22} color={foreground} />
          </Button>
        </View>

        <Modal
          visible={isMenuOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setIsMenuOpen(false)}
        >
          <Pressable
            className="flex-1"
            onPress={() => setIsMenuOpen(false)}
            style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
          >
            <View className="flex-1 items-end justify-start pt-20 px-4">
              <Pressable onPress={(e) => e.stopPropagation()}>
                <Surface
                  variant="secondary"
                  className="rounded-xl p-2 min-w-48"
                >
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onPress={handleSignOut}
                  >
                    <Ionicons
                      name="log-out-outline"
                      size={18}
                      color={dangerColor}
                    />
                    <Button.Label className="text-danger">
                      Sign out
                    </Button.Label>
                  </Button>
                </Surface>
              </Pressable>
            </View>
          </Pressable>
        </Modal>

        <View className="flex-row items-center gap-3">
          <Avatar alt={userName} size="lg">
            <Avatar.Image source={{ uri: avatarImage }} />
            <Avatar.Fallback>
              {fallbackAvatarGenrator(userName)}
            </Avatar.Fallback>
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
