import { Chip, ChipProps } from "heroui-native";
import { TagInputContext } from "./tag-input-context";
import { useContext } from "react";

interface TagInputItemProps extends ChipProps {
  children?: React.ReactElement | React.ReactElement[] | string;
  value: string;
}

export const TagInputItem = ({
  children,
  value,
  ...props
}: TagInputItemProps) => {
  const { toggle, value: inputValue } = useContext(TagInputContext);
  const isSelected = inputValue.includes(value);

  function handlePress() {
    toggle(value);
  }

  return (
    <Chip
      variant={isSelected ? "primary" : "secondary"}
      onPress={handlePress}
      {...props}
    >
      <Chip.Label>{children}</Chip.Label>
    </Chip>
  );
};
