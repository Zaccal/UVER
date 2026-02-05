import { Ionicons } from "@expo/vector-icons";
import { Input } from "./ui/input";
import { Button, useThemeColor } from "heroui-native";

interface SearchInputProps {
  className?: string;
}

export default function SearchInput({ className }: SearchInputProps) {
  const accentColor = useThemeColor('accent')

  return (
    <Input.Root className={className}>
      <Input.Start>
        <Ionicons name="search" size={20} color="gray" />
      </Input.Start>
      <Input.Field placeholder="Search univercity, location..." />
      <Input.End>
        <Button isIconOnly size="sm" className="bg-blue-100/50">
          <Ionicons name="options" size={20} color={accentColor} />
        </Button>
      </Input.End>
    </Input.Root>
  );
}
