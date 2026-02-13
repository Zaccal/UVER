import { Ionicons } from "@expo/vector-icons";
import { Input } from "./ui/input";
import { Button, useThemeColor } from "heroui-native";

interface SearchInputProps {
  className?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  onFilterPress?: () => void;
}

export default function SearchInput({
  className,
  value,
  onChangeText,
  onFilterPress,
}: SearchInputProps) {
  const accentColor = useThemeColor("accent");

  return (
    <Input.Root className={className}>
      <Input.Start>
        <Ionicons name="search" size={20} color="gray" />
      </Input.Start>
      <Input.Field
        placeholder="Search univercity, location..."
        value={value}
        onChangeText={onChangeText}
      />
      <Input.End>
        <Button
          onPress={onFilterPress}
          isIconOnly
          size="sm"
          className="light:bg-blue-100/50 bg-accent/50"
        >
          <Ionicons name="options" size={20} color={accentColor} />
        </Button>
      </Input.End>
    </Input.Root>
  );
}
