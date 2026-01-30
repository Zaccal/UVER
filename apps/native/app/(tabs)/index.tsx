import { Container } from "@/components/container";
import SearchInput from "@/components/search-input";
import { ScrollView, Text } from "react-native";

export default function Home() {
  return (
    <Container className=" bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text className="text-foreground text-xl font-bold">
          Search and apply to the best universities
        </Text>
        <SearchInput className="mt-6" />
      </ScrollView>
    </Container>
  );
}
