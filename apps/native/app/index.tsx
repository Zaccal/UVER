import { Container } from "@/components/container";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "expo-router";
import { Spinner } from "heroui-native";
import React from "react";

export default function Index() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  React.useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace("/(auth)" as never);
      return;
    }

    router.replace("/(tabs)" as never);
  }, [isPending, router, session]);

  if (isPending) {
    return (
      <Container className="flex-1 bg-background items-center justify-center">
        <Spinner size="lg" color="default" />
      </Container>
    );
  }

  return null;
}
