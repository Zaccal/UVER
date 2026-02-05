import { Chip } from "heroui-native";

interface FilterChipProps {
  children: React.ReactElement | React.ReactElement[] | string
  isActive?: boolean
}

export function FilterChip({ children, isActive = false }: FilterChipProps) {
  return (
    <Chip size="lg" className="mx-auto" color={isActive ? "accent" : "default"}>
      <Chip.Label>
        {children}
      </Chip.Label>
    </Chip>
  );
}
