import { Container } from "@/components/container";
import { TagInput } from "@/components/tag-input";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";

interface FilterProps {}

export default function Filter({}: FilterProps) {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
          <TagInput.Root value={selectedTags} onChange={setSelectedTags}>
            <TagInput.Label>Tags</TagInput.Label>
            <TagInput.Item size="lg" value="value1">
              Item 1
            </TagInput.Item>
            <TagInput.Item size="lg" value="value2">
              Item 2
            </TagInput.Item>
            <TagInput.Item size="lg" value="value3">
              Item 3
            </TagInput.Item>
          </TagInput.Root>
        </ScrollView>
      </Container>
    </View>
  );
}
