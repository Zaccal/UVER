import type { Institution } from "@UVER/db/schema";
import { institutionContext } from '@/contexts/institution-context'
import { Card } from "heroui-native";

interface InstitutionsCardProps {
  institution: Institution
  children?: React.ReactElement[] | React.ReactElement
}

export function InstitutionsCard({ institution, children }: InstitutionsCardProps) {
  return (
    <institutionContext.Provider initialValue={{ data: institution }}>
      <Card className="p-0">
        {children}
      </Card>
    </institutionContext.Provider>
  );
}
