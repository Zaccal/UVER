import type { Institution } from "@UVER/db/schema";
import { institutionContext } from "@/components/institutionsCard/institution-context";
import { Card } from "heroui-native";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

interface InstitutionsCardProps {
  institution: Institution;
  children?: React.ReactElement[] | React.ReactElement;
}

export function InstitutionsCard({
  institution,
  children,
}: InstitutionsCardProps) {
  const router = useRouter();

  return (
    <institutionContext.Provider initialValue={institution}>
      <TouchableOpacity
        onPress={() => router.push(`/institution/${institution.id}`)}
      >
        <Card className="p-0">{children}</Card>
      </TouchableOpacity>
    </institutionContext.Provider>
  );
}
