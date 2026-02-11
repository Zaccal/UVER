import SelectCity from "@/components/city-select/city-select";
import { Container } from "@/components/container";
import SelectCountry from "@/components/country-select/country-select";
import DegreeTypeSelect from "@/components/degree-type-select/degree-type-select";
import { TagInput } from "@/components/tag-input";
import { CHIPS_MAJORS } from "@/lib/constants";
import { Ionicons } from "@expo/vector-icons";
import { Rating } from "@kolking/react-native-rating";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";

interface FilterProps {}

export default function Filter({}: FilterProps) {
  const router = useRouter();
  const [country, setCountry] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [degreeType, setDegreeType] = useState<string>("");
  const [majors, setMajors] = useState<string[]>([]);

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
        <ScrollView>
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
        </ScrollView>
      </Container>
    </View>
  );
}
