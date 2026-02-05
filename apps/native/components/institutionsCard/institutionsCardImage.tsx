import { institutionContext } from "@/contexts/institution-context";
import { Card } from "heroui-native";
import { Image } from "react-native";

interface InstitutionCardImageProps {
  url: string
}

export default function InstitutionCardImage({ url }: InstitutionCardImageProps) {
  const data = institutionContext.useSelect(state => state.data)

  return (
    <Card.Header>
      <Image className="z-0 w-full h-50 object-cover" source={{ uri: url }} alt={`Logo: ${data.name}`} />
    </Card.Header>
  );
}
