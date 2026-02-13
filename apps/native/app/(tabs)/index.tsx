import { Container } from "@/components/container";
import { InstitutionCard } from "@/components/institutionsCard";
import SearchInput from "@/components/search-input";
import { TagInput } from "@/components/tag-input";
import { CHIPS_MAJORS } from "@/lib/constants";
import { authClient } from "@/lib/auth-client";
import { orpc } from "@/utils/orpc";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Spinner } from "heroui-native";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    q?: string;
    majors?: string;
    country?: string;
    city?: string;
    rating?: string;
    degreeType?: string;
  }>();

  const [search, setSearch] = React.useState(params.q ?? "");
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

  const selectedMajors = React.useMemo(() => {
    const raw = params.majors ?? "";
    if (!raw) return [];
    return String(raw)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [params.majors]);

  const filteredInstitutions = React.useMemo(() => {
    const q = (params.q ?? "").toString().trim().toLowerCase();
    const majors = selectedMajors.map((m) => m.toLowerCase());
    const country = (params.country ?? "").toString().trim().toLowerCase();
    const city = (params.city ?? "").toString().trim().toLowerCase();
    const degreeType = (params.degreeType ?? "")
      .toString()
      .trim()
      .toLowerCase();
    const rating = params.rating ? Number(params.rating) : null;

    return institutions.filter((inst) => {
      if (q) {
        const haystack = [
          inst.name,
          inst.address,
          inst.city,
          inst.country,
          ...(inst.majors ?? []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      if (country && (inst.country ?? "").toLowerCase() !== country)
        return false;
      if (city && (inst.city ?? "").toLowerCase() !== city) return false;
      if (degreeType && (inst.degreeType ?? "").toLowerCase() !== degreeType)
        return false;
      if (rating != null && (inst.rating ?? 0) < rating) return false;

      if (majors.length) {
        const instMajors = (inst.majors ?? []).map((m) => m.toLowerCase());
        const anyMatch = majors.some((m) => instMajors.includes(m));
        if (!anyMatch) return false;
      }

      return true;
    });
  }, [institutions, params, selectedMajors]);

  function setHomeParams(next: {
    q?: string;
    majors?: string;
    country?: string;
    city?: string;
    rating?: string;
    degreeType?: string;
  }) {
    router.setParams({
      q: next.q ?? (params.q as string | undefined),
      majors: next.majors ?? (params.majors as string | undefined),
      country: next.country ?? (params.country as string | undefined),
      city: next.city ?? (params.city as string | undefined),
      rating: next.rating ?? (params.rating as string | undefined),
      degreeType: next.degreeType ?? (params.degreeType as string | undefined),
    } as never);
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
        <SearchInput
          value={search}
          onChangeText={(value) => {
            setSearch(value);
            setHomeParams({ q: value || undefined });
          }}
          onFilterPress={() => {
            router.push({
              pathname: "/filter",
              params: {
                q: params.q,
                majors: params.majors,
                country: params.country,
                city: params.city,
                rating: params.rating,
                degreeType: params.degreeType,
              },
            } as never);
          }}
        />
        <TagInput.Root
          className="mt-4"
          value={selectedMajors}
          onChange={(next) => {
            setHomeParams({ majors: next.length ? next.join(",") : undefined });
          }}
        >
          <TagInput.Content>
            {CHIPS_MAJORS.map((data) => (
              <TagInput.Item key={data.label} value={data.label}>
                {data.label}
              </TagInput.Item>
            ))}
            <Button
              onPress={() => {
                router.push({
                  pathname: "/filter",
                  params: {
                    q: params.q,
                    majors: params.majors,
                    country: params.country,
                    city: params.city,
                    rating: params.rating,
                    degreeType: params.degreeType,
                  },
                } as never);
              }}
              size="sm"
              variant="ghost"
            >
              <Text className="text-accent">Show more 30+</Text>
            </Button>
          </TagInput.Content>
        </TagInput.Root>
        <View className="mt-7 flex-col gap-6">
          {filteredInstitutions.map((data) => (
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
