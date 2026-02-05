import { institutionContext } from "@/contexts/institution-context";
import { Card } from "heroui-native";

export default function InstitutionsCardTitle() {
  const data = institutionContext.useSelect(state => state.data)

  return (
    <Card.Title>
      {data.name}
    </Card.Title>
  );
}
