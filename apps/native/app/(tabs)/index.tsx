import { Container } from "@/components/container";
import { InstitutionCard } from "@/components/institutionsCard";
import SearchInput from "@/components/search-input";
import { TagInput } from "@/components/tag-input";
import { CHIPS_MAJORS, MOCK_DATA_INSTITUTIONS } from "@/lib/constants";
import { useRouter } from "expo-router";
import { Button } from "heroui-native";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function Home() {
  const router = useRouter()
  const [filterTags, setFilterTags] = useState<string[]>([])

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
       <TagInput.Root className="mt-4" value={filterTags} onChange={setFilterTags}>
          <TagInput.Content>
            {CHIPS_MAJORS.map(data => (
              <TagInput.Item key={data.label} value={data.label} >
                {data.label}
              </TagInput.Item>
            ))}
            <Button onPress={() => {
             router.push('/filter') 
            }} size="sm" variant="ghost">
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
