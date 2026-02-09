import { Ionicons } from "@expo/vector-icons";
import { Input } from "./ui/input";
import { Button, useThemeColor } from "heroui-native";
import { useRouter } from "expo-router";

interface SearchInputProps {
  className?: string;
}

export default function SearchInput({ className }: SearchInputProps) {
  const accentColor = useThemeColor("accent");
  const router = useRouter();

  function handleFilter() {
    router.push("/filter");
  }

  return (
    <Input.Root className={className}>
      <Input.Start>
        <Ionicons name="search" size={20} color="gray" />
      </Input.Start>
      <Input.Field placeholder="Search univercity, location..." />
      <Input.End>
        <Button
          onPress={handleFilter}
          isIconOnly
          size="sm"
          className="bg-blue-100/50"
        >
          <Ionicons name="options" size={20} color={accentColor} />
        </Button>
      </Input.End>
    </Input.Root>
  );
}
