import { Container } from "@/components/container";
import { MOCK_DATA_INSTITUTIONS } from "@/lib/constants";
import { formatNumberPrice } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { Rating } from "@kolking/react-native-rating";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Button, Chip, useThemeColor } from "heroui-native";
import {
  ScrollView,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

export default function Institution() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const accentColor = useThemeColor("accent");

  const institution = MOCK_DATA_INSTITUTIONS.find(
    (item) => item.id === String(id),
  );

  if (!institution) {
    return (
      <Container className="flex-1 items-center justify-center bg-background">
        <Text className="text-foreground text-base">
          Institution not found.
        </Text>
      </Container>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="relative">
          <View className="absolute px-2 pt-12 z-10 top-0 left-0 w-full">
            <View className="flex-row items-center justify-between">
              <Button isIconOnly onPress={() => router.back()} variant="ghost">
                <Ionicons name="chevron-back-outline" size={24} color="white" />
              </Button>
              <View className="flex-row items-center gap-1">
                <Button isIconOnly variant="ghost">
                  <Ionicons name="share-outline" size={24} color="white" />
                </Button>
                <Button isIconOnly variant="ghost">
                  <Ionicons name="heart-outline" size={24} color="white" />
                </Button>
              </View>
            </View>
          </View>
          <Image
            source={{ uri: institution.image }}
            className="h-80 w-full"
            resizeMode="cover"
          />
        </View>
        <View className="flex-1">
          <View className="p-4 gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-2xl font-bold text-foreground">
                {institution.name}
              </Text>
              <Button isIconOnly size="sm" variant="ghost">
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={24}
                  color={accentColor}
                />
              </Button>
            </View>

            <Rating
              rating={institution.rating ?? 0}
              size={17}
              variant="stars-outline"
            />

            <Text className="font-semibold">
              Price from: ${formatNumberPrice(institution.tuitionPrice)}
            </Text>

            <Text className="text-base text-foreground mt-4">
              {institution.description}
            </Text>

            <View className="mt-3">
              <Text className="font-semibold text-foreground">Address</Text>
              <Text className="text-sm text-muted-foreground">
                {institution.address}
              </Text>
            </View>

            <View className="mt-3">
              <Text className="font-semibold text-foreground">Website</Text>
              <Text
                className="text-sm text-accent"
                onPress={() => Linking.openURL(institution.website)}
              >
                {institution.website}
              </Text>
            </View>

            <View className="mt-3">
              <Text className="font-semibold text-foreground mb-2">Majors</Text>
              <View className="flex flex-wrap gap-2 items-center">
                {institution.majors?.map((data) => (
                  <Chip key={data}>
                    <Chip.Label>{data}</Chip.Label>
                  </Chip>
                ))}
              </View>
            </View>

            <View className="mt-4">
              <Button>Apply</Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
