import { institutionContext } from "@/components/institutionsCard/institution-context";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "heroui-native";

export function InstitutionsCardAddress() {
  const address = institutionContext.useSelect(state => state.address)

  return (
    <Card.Description className="text-sm">
      <Ionicons name="location-outline" size={16} /> {address}
    </Card.Description>
  );
}
