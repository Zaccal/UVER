import { Container } from "@/components/container";
import { FilterChip } from "@/components/filter-chip";
import { InstitutionCard } from "@/components/institutionsCard";
import SearchInput from "@/components/search-input";
import { Institution } from "@UVER/db/schema";
import { ScrollView, Text, View } from "react-native";

const IMAGE_URL = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F-e9bUEPvkzbg%2FTha7GtBxj4I%2FAAAAAAAAI3k%2FQcgT3HpwUp8%2Fs1600%2FHarvard%252BUniversity%252BUSA%252BWallpapers%252Bby%252Bcool%252Bwallpapers%252B%2525281%252529.jpg&f=1&nofb=1&ipt=324cbffab4230b0ee657624527141f679f533a32767aacffc00d00d76f065f49";
const LOGO_URL = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F006%2F470%2F647%2Foriginal%2Funiversity-education-logo-design-template-free-vector.jpg&f=1&nofb=1&ipt=b127831a9eeb8bc218334ccb9bddccec5735f8322dfaafb35860c79a70c6d8de"

const institutions_data: Institution[] = [
  {
    id: "1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: IMAGE_URL,
    logo: LOGO_URL,
    name: "University of Example",
    rating: 4.5,
    website: "https://example.com",
    address: "Los Angeles, California, 90089, United States",
    applicationDeadline: new Date("08.03.2026"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: IMAGE_URL,
    logo: LOGO_URL,
    name: "University of Example",
    rating: 5,
    website: "https://example.com",
    address: "Los Angeles, California, 90089, United States",
    applicationDeadline: new Date("08.03.2026"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: IMAGE_URL,
    logo: LOGO_URL,
    name: "University of Example",
    rating: 4,
    website: "https://example.com",
    address: "Los Angeles, California, 90089, United States",
    applicationDeadline: new Date("08.03.2026"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: IMAGE_URL,
    logo: LOGO_URL,
    name: "University of Example",
    rating: 3,
    website: "https://example.com",
    address: "Los Angeles, California, 90089, United States",
    applicationDeadline: new Date("08.03.2026"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "5",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: IMAGE_URL,
    logo: LOGO_URL,
    name: "University of Example",
    rating: 2,
    website: "https://example.com",
    address: "Los Angeles, California, 90089, United States",
    applicationDeadline: new Date("08.03.2026"),
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const chips = [
  {
    label: "📒 Accounting",
    active: true
  },
  {
    label: "📐 Architecture",
    active: false,
  },
  {
    label: "🎨 Art",
    active: false,
  },
  {
    label: "🍥 Design",
    active: false,
  },
  {
    label: "👔 Business",
    active: false,
  },
];

export default function Home() {
  return (
    <Container className=" bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text className="text-foreground text-xl font-bold">
          Search and apply to the best universities
        </Text>
        <SearchInput className="mt-6" />
        <FilterChip.Root className="mt-4">
          {chips.map((chip) => (
            <FilterChip.Chip key={chip.label} isActive={chip.active}>{chip.label}</FilterChip.Chip>
          ))}
          <FilterChip.ShowMore>
            Show more 30+
          </FilterChip.ShowMore>
        </FilterChip.Root>
        <View className="mt-7 flex-col gap-6">
          {institutions_data.map(data => (
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
