import { Button, Select } from "heroui-native";
import { Text, View } from "react-native";

interface DegreeTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DegreeTypeSelect({
  value,
  onChange,
}: DegreeTypeSelectProps) {
  return (
    <Select
      value={{
        label: value,
        value,
      }}
      onValueChange={(state) => {
        onChange(state?.value!);
      }}
    >
      <Select.Trigger asChild>
        <Button variant="tertiary" size="sm">
          {value ? (
            <View className="flex-row items-center gap-2">
              <Text className="text-base">{value}</Text>
            </View>
          ) : (
            <Text className="text-foreground">Select Degree Type</Text>
          )}
        </Button>
      </Select.Trigger>
      <Select.Portal>
        <Select.Overlay />
        <Select.Content>
          <Select.Item label="Bachelor" value="bachelor">
            <Text>Bachelor</Text>
          </Select.Item>
          <Select.Item label="Master" value="master">
            <Text>Master</Text>
          </Select.Item>
          <Select.Item label="Doctorate" value="doctorate">
            <Text>Doctorate</Text>
          </Select.Item>
        </Select.Content>
      </Select.Portal>
    </Select>
  );
}
