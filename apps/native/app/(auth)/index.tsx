import { Container } from "@/components/container";
import { SignIn } from "@/components/sign-in";
import { SignUp } from "@/components/sign-up";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "expo-router";
import React from "react";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function Auth() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"sign-up" | "sign-in">("sign-up");
  const { data: session, isPending } = authClient.useSession();

  React.useEffect(() => {
    if (isPending) return;
    if (session) {
      router.replace("/(tabs)" as never);
    }
  }, [isPending, router, session]);

  return (
    <Container className="flex-1 bg-background px-4 py-8">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <View className="gap-6">
          <Text className="text-foreground text-2xl font-bold">
            Welcome to UVER
          </Text>
          <Text className="text-gray-400 light:text-gray-700 text-sm">
            Create an account to save your applications and manage your profile.
          </Text>
          {authMode === "sign-up" ? <SignUp /> : <SignIn />}

          <View className="flex-row justify-center mt-2">
            {authMode === "sign-up" ? (
              <Text className="text-gray-400 light:text-gray-700 text-sm">
                Already have an account?{" "}
                <Text
                  className="text-accent font-medium"
                  onPress={() => setAuthMode("sign-in")}
                >
                  Sign in
                </Text>
              </Text>
            ) : (
              <Text className="text-gray-400 light:text-gray-700 text-sm">
                Don&apos;t have an account yet?{" "}
                <Text
                  className="text-accent font-medium"
                  onPress={() => setAuthMode("sign-up")}
                >
                  Create one
                </Text>
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
