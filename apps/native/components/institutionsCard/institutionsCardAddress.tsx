import { institutionContext } from "@/contexts/institution-context";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "heroui-native";

export function InstitutionsCardAddress() {
  const address = institutionContext.useSelect(state => state.data.address)

  return (
    <Card.Description className="text-sm">
      <Ionicons name="location-outline" size={16} /> {address}
    </Card.Description>
  );
}
