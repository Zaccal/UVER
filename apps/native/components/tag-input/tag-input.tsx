import { View } from "react-native";
import { TagInputContext } from "./tag-input-context";
import { cn } from "heroui-native";

interface TagInputProps {
  children?: React.ReactElement | React.ReactElement[];
  value?: string[];
  onChange?: (value: string[]) => void;
  className?: string;
}

export function TagInput({
  children,
  onChange = () => {},
  value = [],
  className,
}: TagInputProps) {
  const toggleHandler = (itemValue: string) => {
    const newValue = value.includes(itemValue)
      ? value.filter((v) => v !== itemValue)
      : [...value, itemValue];
    onChange(newValue);
  };

  return (
    <TagInputContext.Provider value={{ value, toggle: toggleHandler }}>
      <View className={cn(className, "flex-wrap gap-2 w-full")}>
        {children}
      </View>
    </TagInputContext.Provider>
  );
}
