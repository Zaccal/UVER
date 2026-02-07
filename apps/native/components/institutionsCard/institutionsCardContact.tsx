import { Button } from "heroui-native";

interface InstitutionsCardContactProps {
  className?: string
}

export function InstitutionsCardContact({ className }: InstitutionsCardContactProps) {
  return (
    <>
      <Button variant="secondary" className={className}>Contact</Button>
    </>
  );
}
