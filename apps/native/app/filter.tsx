import SelectCity from "@/components/city-select/city-select";
import { Container } from "@/components/container";
import SelectCountry from "@/components/country-select/country-select";
import DegreeTypeSelect from "@/components/degree-type-select/degree-type-select";
import { TagInput } from "@/components/tag-input";
import { CHIPS_MAJORS } from "@/lib/constants";
import { Ionicons } from "@expo/vector-icons";
import { Rating } from "@kolking/react-native-rating";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import { Button } from "heroui-native";

interface FilterProps {}

export default function Filter({}: FilterProps) {
  const router = useRouter();
  const params = useLocalSearchParams<{
    q?: string;
    majors?: string;
    country?: string;
    city?: string;
    rating?: string;
    degreeType?: string;
  }>();

  const [country, setCountry] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [degreeType, setDegreeType] = useState<string>("");
  const [majors, setMajors] = useState<string[]>([]);

  useEffect(() => {
    setCountry(params.country ? String(params.country) : null);
    setCity(params.city ? String(params.city) : null);
    setDegreeType(params.degreeType ? String(params.degreeType) : "");
    setRating(params.rating ? Number(params.rating) : 5);

    const rawMajors = params.majors ? String(params.majors) : "";
    setMajors(
      rawMajors
        ? rawMajors
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    );
  }, [
    params.city,
    params.country,
    params.degreeType,
    params.majors,
    params.rating,
  ]);

  function applyFilters() {
    router.replace({
      pathname: "/",
      params: {
        q: params.q,
        majors: majors.length ? majors.join(",") : undefined,
        country: country || undefined,
        city: city || undefined,
        rating: rating ? String(rating) : undefined,
        degreeType: degreeType || undefined,
      },
    } as never);
  }

  function resetFilters() {
    setCountry(null);
    setCity(null);
    setRating(5);
    setDegreeType("");
    setMajors([]);

    router.replace({
      pathname: "/",
      params: {
        q: params.q,
      },
    } as never);
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Filters",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerShown: true,
        }}
      />
      <Container className="bg-background py-6">
        <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
          <Text className="text-sm text-foreground text-gray-500 mb-2">
            Location:{" "}
          </Text>
          <View className="flex flex-col gap-3">
            <SelectCountry onValueChange={setCountry} />
            <SelectCity onValueChange={setCity} country={country ?? ""} />
          </View>
          <Text className="mt-4 text-sm text-foreground text-gray-500 mb-2">
            Rating:{" "}
          </Text>
          <Rating
            variant="stars-outline"
            rating={rating}
            onChange={(state) => setRating(state)}
          />
          <Text className="mt-4 text-sm text-foreground text-gray-500 mb-2">
            Degree Type:{" "}
          </Text>
          <DegreeTypeSelect onChange={setDegreeType} value={degreeType} />

          <TagInput.Root className="mt-4" value={majors} onChange={setMajors}>
            <TagInput.Label>Majors:</TagInput.Label>
            <TagInput.Content>
              {CHIPS_MAJORS.map((major) => (
                <TagInput.Item key={major.label} value={major.label}>
                  {major.label}
                </TagInput.Item>
              ))}
            </TagInput.Content>
          </TagInput.Root>

          <View className="mt-6 flex-row gap-3">
            <Button variant="ghost" className="flex-1" onPress={resetFilters}>
              <Button.Label>Reset</Button.Label>
            </Button>
            <Button className="flex-1" onPress={applyFilters}>
              <Button.Label>Apply</Button.Label>
            </Button>
          </View>
        </ScrollView>
      </Container>
    </View>
  );
}
