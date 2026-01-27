import { Card } from "heroui-native";
import { Text, View } from "react-native";

import { Container } from "@/components/container";
import Header from "@/components/header";

export default function Home() {
  return (
    <Container className="px-6">
      <Text className="text-foreground">
        Search and apply to the best universities
      </Text>
    </Container>
  );
}
