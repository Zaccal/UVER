import { cn } from "heroui-native";
import { View } from "react-native";

interface InputStartContentProps {
  className?: string;
  children?: React.ReactNode;
}

export default function InputStartContent({
  className,
  children,
}: InputStartContentProps) {
  return (
    <View className={cn("absolute left-3 top-1/2 -translate-y-1/2", className)}>
      {children}
    </View>
  );
}
