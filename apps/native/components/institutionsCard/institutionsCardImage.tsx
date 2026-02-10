import { institutionContext } from "@/components/institutionsCard/institution-context";
import { Card } from "heroui-native";
import { Image } from "react-native";

interface InstitutionCardImageProps {
  url: string
}

export function InstitutionCardImage({ url }: InstitutionCardImageProps) {
  const data = institutionContext.useSelect(state => state)

  return (
    <Card.Header>
      <Image className="z-0 w-full h-50 object-cover" source={{ uri: url }} alt={`Logo: ${data.name}`} />
    </Card.Header>
  );
}
