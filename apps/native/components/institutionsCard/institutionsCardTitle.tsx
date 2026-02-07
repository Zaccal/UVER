import { institutionContext } from "@/contexts/institution-context";
import { Card } from "heroui-native";

export function InstitutionsCardTitle() {
  const data = institutionContext.useSelect(state => state.data)

  return (
    <Card.Title>
      {data.name}
    </Card.Title>
  );
}
