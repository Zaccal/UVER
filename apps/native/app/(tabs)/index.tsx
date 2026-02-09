import { Container } from "@/components/container";
import { FilterChip } from "@/components/filter-chip";
import { InstitutionCard } from "@/components/institutionsCard";
import SearchInput from "@/components/search-input";
import { CHIPS_MAJORS, MOCK_DATA_INSTITUTIONS } from "@/lib/constants";
import { ScrollView, Text, View } from "react-native";

export default function Home() {
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
        <FilterChip.Root className="mt-4">
          {CHIPS_MAJORS.map((chip) => (
            <FilterChip.Chip key={chip.label} isActive={chip.active}>
              {chip.label}
            </FilterChip.Chip>
          ))}
          <FilterChip.ShowMore>Show more 30+</FilterChip.ShowMore>
        </FilterChip.Root>
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
                  <InstitutionCard.Contact className="flex-1" />
                </InstitutionCard.Footer>
              </InstitutionCard.Content>
            </InstitutionCard.Root>
          ))}
        </View>
      </ScrollView>
    </Container>
  );
}
