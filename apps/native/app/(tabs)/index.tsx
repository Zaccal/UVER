import { Container } from "@/components/container";
import { InstitutionCard } from "@/components/institutionsCard";
import SearchInput from "@/components/search-input";
import { TagInput } from "@/components/tag-input";
import { CHIPS_MAJORS } from "@/lib/constants";
import { authClient } from "@/lib/auth-client";
import { orpc } from "@/utils/orpc";
import { useRouter } from "expo-router";
import { Button, Spinner } from "heroui-native";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const router = useRouter();
  const [filterTags, setFilterTags] = React.useState<string[]>([]);
  const { data: session, isPending } = authClient.useSession();

  const institutionsQuery = useQuery(orpc.institutions.list.queryOptions());

  React.useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.replace("/(auth)" as never);
    }
  }, [isPending, router, session]);

  if (isPending) {
    return (
      <Container className="flex-1 bg-background items-center justify-center">
        <Spinner size="lg" color="default" />
      </Container>
    );
  }

  if (!session) {
    return (
      <Container className="flex-1 bg-background items-center justify-center">
        <Spinner size="lg" color="default" />
      </Container>
    );
  }

  if (institutionsQuery.isLoading) {
    return (
      <Container className="flex-1 bg-background items-center justify-center">
        <Spinner size="lg" color="default" />
      </Container>
    );
  }

  const institutions = institutionsQuery.data ?? [];
  console.log(institutionsQuery.error);

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
          {institutions.map((data) => (
            <InstitutionCard.Root key={data.id} institution={data}>
              <InstitutionCard.Image url={data.image} />
              <InstitutionCard.Content>
                <InstitutionCard.Title />
                <InstitutionCard.Rating />
                <InstitutionCard.Address />
                <InstitutionCard.ApplicationDeadline className="my-2" />
                <InstitutionCard.Footer className="flex-row gap-2">
                  <View className="flex-5">
                    <InstitutionCard.Apply />
                  </View>
                  <InstitutionCard.Contact className="flex-3" />
                </InstitutionCard.Footer>
              </InstitutionCard.Content>
            </InstitutionCard.Root>
          ))}
        </View>
      </ScrollView>
    </Container>
  );
}
