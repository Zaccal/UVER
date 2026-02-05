import { Button } from "heroui-native";

interface FilterChipShowMoreProps {
  children: React.ReactElement | React.ReactElement[] | string
}

export function FilterChipShowMore({ children }: FilterChipShowMoreProps) {
  return (
    <Button size="sm" variant="secondary" className="text-xs">
      {children}
    </Button>
  );
}
