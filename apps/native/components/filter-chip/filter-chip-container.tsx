import { cn } from "heroui-native";
import { View } from "react-native";

interface FilterChipContainerProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string
}

export function FilterChipContainer({ children, className }: FilterChipContainerProps) {
  return (
    <View className={cn("flex-row flex-wrap gap-y-3 gap-x-1 items-center", className)}>
      {children}
    </View>
  );
}
