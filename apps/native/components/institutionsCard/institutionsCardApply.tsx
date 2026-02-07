import { Button } from "heroui-native";

interface InstitutionsCardApplyProps {
  className?: string
}

export function InstitutionsCardApply({ className }: InstitutionsCardApplyProps) {
  return (
    <>
      <Button className={className}>Apply</Button>
    </>
  );
}
