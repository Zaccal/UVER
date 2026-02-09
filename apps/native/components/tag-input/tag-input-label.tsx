import { cn } from "heroui-native";
import { Text } from "react-native";
import { TextProps } from "react-native/Libraries/Text/Text";

export default function TagInputLabel({
  children,
  className,
  ...props
}: TextProps) {
  return (
    <Text
      {...props}
      className={cn("text-sm font-medium text-gray-500 mb-2", className)}
    >
      {children}
    </Text>
  );
}
