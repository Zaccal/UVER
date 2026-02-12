import { Text, View } from "react-native";

type ResumeCardProps = {
  title: string;
  description: string;
};

export default function ResumeCard({ title, description }: ResumeCardProps) {
  return (
    <View className="mt-4 light:bg-gray-100 bg-gray-600 p-4 rounded-xl">
      <Text className="text-foreground text-lg font-semibold">{title}</Text>
      <Text className="text-foreground/70 text-sm mt-1">{description}</Text>
    </View>
  );
}
