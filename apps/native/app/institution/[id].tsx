import { Container } from "@/components/container";
import { orpc, queryClient } from "@/utils/orpc";
import { formatNumberPrice } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { Rating } from "@kolking/react-native-rating";
import { router, Stack, useLocalSearchParams } from "expo-router";
import {
  Button,
  Chip,
  ErrorView,
  Spinner,
  Surface,
  TextField,
  useThemeColor,
} from "heroui-native";
import React from "react";
import {
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function Institution() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const accentColor = useThemeColor("accent");

  const [isApplyOpen, setIsApplyOpen] = React.useState(false);
  const [program, setProgram] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const institutionQuery = useQuery(
    orpc.institutions.byId.queryOptions({
      input: { id: String(id) },
    }),
  );

  const applyMutation = useMutation(
    orpc.applications.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: orpc.applications.key() });
        setIsApplyOpen(false);
        setProgram("");
        setMessage("");
      },
      onError: (err) => {
        setError(err instanceof Error ? err.message : "Failed to apply");
      },
    }),
  );

  const institution = institutionQuery.data;

  React.useEffect(() => {
    if (!isApplyOpen) {
      setError(null);
    }
  }, [isApplyOpen]);

  if (institutionQuery.isLoading) {
    return (
      <Container className="flex-1 items-center justify-center bg-background">
        <Spinner size="lg" color="default" />
      </Container>
    );
  }

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
      <View className="bg-background">
        <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
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

              <Text className="font-semibold text-foreground">
                Price from: ${formatNumberPrice(institution.tuitionPrice)}
              </Text>

              <Text className="text-base text-foreground mt-4">
                {institution.description}
              </Text>

              <View className="mt-3">
                <Text className="font-semibold text-foreground">Address</Text>
                <Text className="text-sm text-foreground">
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
                <Text className="font-semibold text-foreground mb-2">
                  Majors
                </Text>
                <View className="flex flex-wrap gap-2 items-center">
                  {institution.majors?.map((data) => (
                    <Chip key={data}>
                      <Chip.Label>{data}</Chip.Label>
                    </Chip>
                  ))}
                </View>
              </View>

              <View className="mt-4">
                <Button onPress={() => setIsApplyOpen(true)}>Apply</Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <Modal
        visible={isApplyOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsApplyOpen(false)}
      >
        <Pressable
          className="flex-1"
          onPress={() => setIsApplyOpen(false)}
          style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
        >
          <View className="flex-1 items-center justify-center px-4">
            <Pressable onPress={(e) => e.stopPropagation()}>
              <Surface variant="secondary" className="w-80 rounded-xl p-4">
                <Text className="text-foreground font-semibold text-lg mb-3">
                  Apply to {institution?.name}
                </Text>

                <ErrorView isInvalid={!!error} className="mb-3">
                  {error}
                </ErrorView>

                <View className="gap-3">
                  <TextField>
                    <TextField.Label>Program</TextField.Label>
                    <TextField.Input
                      value={program}
                      onChangeText={setProgram}
                      placeholder="e.g. Bachelor of Computer Science"
                    />
                  </TextField>

                  <TextField>
                    <TextField.Label>Message (optional)</TextField.Label>
                    <TextField.Input
                      value={message}
                      onChangeText={setMessage}
                      placeholder="Tell us about yourself"
                    />
                  </TextField>

                  <View className="flex-row gap-3 mt-2">
                    <Button
                      variant="ghost"
                      className="flex-1"
                      onPress={() => setIsApplyOpen(false)}
                      isDisabled={applyMutation.isPending}
                    >
                      <Button.Label>Cancel</Button.Label>
                    </Button>
                    <Button
                      className="flex-1"
                      onPress={() => {
                        setError(null);
                        applyMutation.mutate({
                          institutionId: String(id),
                          program,
                          message: message || undefined,
                        });
                      }}
                      isDisabled={!program || applyMutation.isPending}
                    >
                      {applyMutation.isPending ? (
                        <Spinner size="sm" color="default" />
                      ) : (
                        <Button.Label>Submit</Button.Label>
                      )}
                    </Button>
                  </View>
                </View>
              </Surface>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
