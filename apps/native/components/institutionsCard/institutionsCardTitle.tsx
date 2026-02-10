import { institutionContext } from "@/components/institutionsCard/institution-context";
import { Card } from "heroui-native";

export function InstitutionsCardTitle() {
  const name = institutionContext.useSelect(state => state.name)

  return (
    <Card.Title>
      {name}
    </Card.Title>
  );
}
