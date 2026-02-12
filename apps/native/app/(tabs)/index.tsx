import { Container } from "@/components/container";
import { InstitutionCard } from "@/components/institutionsCard";
import SearchInput from "@/components/search-input";
import { TagInput } from "@/components/tag-input";
import { SignIn } from "@/components/sign-in";
import { SignUp } from "@/components/sign-up";
import { CHIPS_MAJORS, MOCK_DATA_INSTITUTIONS } from "@/lib/constants";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "expo-router";
import { Button, Spinner } from "heroui-native";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [authMode, setAuthMode] = useState<"sign-up" | "sign-in">("sign-up");
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <Container className="flex-1 bg-background items-center justify-center">
        <Spinner size="lg" color="default" />
      </Container>
    );
  }

  if (!session) {
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
              Create an account to save your applications and manage your
              profile.
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

  return (
    <Container className="bg-background">
      <ScrollView
        stickyHeaderIndices={[1]}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Text className="mb-4 text-foreground text-xl font-bold">
          Search and apply to the best universities
        </Text>
        <SearchInput />
        <TagInput.Root
          className="mt-4"
          value={filterTags}
          onChange={setFilterTags}
        >
          <TagInput.Content>
            {CHIPS_MAJORS.map((data) => (
              <TagInput.Item key={data.label} value={data.label}>
                {data.label}
              </TagInput.Item>
            ))}
            <Button
              onPress={() => {
                router.push("/filter");
              }}
              size="sm"
              variant="ghost"
            >
              <Text className="text-accent">Show more 30+</Text>
            </Button>
          </TagInput.Content>
        </TagInput.Root>
        <View className="mt-7 flex-col gap-6">
          {MOCK_DATA_INSTITUTIONS.map((data) => (
            <InstitutionCard.Root key={data.id} institution={data}>
              <InstitutionCard.Image url={data.image} />
              <InstitutionCard.Content>
                <InstitutionCard.Title />
                <InstitutionCard.Rating />
                <InstitutionCard.Address />
                <InstitutionCard.ApplicationDeadline className="my-2" />
                <InstitutionCard.Footer className="flex-row gap-2">
                  <InstitutionCard.Apply className="flex-5" />
                  <InstitutionCard.Contact className="flex-2" />
                </InstitutionCard.Footer>
              </InstitutionCard.Content>
            </InstitutionCard.Root>
          ))}
        </View>
      </ScrollView>
    </Container>
  );
}
