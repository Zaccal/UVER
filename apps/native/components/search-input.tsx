import { Ionicons } from "@expo/vector-icons";
import { TextField } from "heroui-native";
import InputStartContent from "./common/InputStartContent";

interface SearchInputProps {
  className?: string;
}

export default function SearchInput({ className }: SearchInputProps) {
  return (
    <>
      <TextField className={className}>
        <Ionicons name="search" size={24} color="gray" />
        <TextField.Input
          className="r"
          placeholder="Search university, location"
        />
      </TextField>
    </>
  );
}
