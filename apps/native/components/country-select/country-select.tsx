import { Button, Select } from "heroui-native";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import countries from "world-countries";
import { TextField } from "heroui-native";

interface SelectCountryProps {
  onValueChange?: (value: string) => void;
}

export default function SelectCountry({
  onValueChange = () => {},
}: SelectCountryProps) {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState<{
    value: string;
    label: string;
    flag: string;
    code: string;
  }>();

  return (
    <Select
      value={country}
      onValueChange={(value) => {
        const selected = countries.find((c) => c.cca2 === value?.value);
        onValueChange(selected?.cca2 || "");
        setCountry({
          value: selected?.cca2 || "",
          label: selected?.name.common || "",
          flag: selected?.flag || "",
          code: selected?.cca3 || "",
        });
      }}
    >
      <Select.Trigger asChild>
        <Button variant="secondary" size="sm">
          {country ? (
            <View className="flex-row items-center gap-2">
              <Text className="text-base">{country.flag}</Text>
              <Text className="text-sm text-foreground">{country.label}</Text>
            </View>
          ) : (
            <Text className="text-foreground">Select Country</Text>
          )}
        </Button>
      </Select.Trigger>
      <Select.Portal>
        <Select.Overlay />
        <Select.Content
          presentation="dialog"
          className="h-[70vh] px-4 light:bg-white border border-gray-300 rounded-2xl"
        >
          <View className="flex flex-row justify-between items-center pt-4 pb-3">
            <Select.ListLabel>Countries</Select.ListLabel>
            <Select.Close />
          </View>
          <TextField className="mb-4">
            <TextField.Input
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
            />
          </TextField>
          <ScrollView>
            {countries
              .filter((country) =>
                country.name.common
                  .toLowerCase()
                  .includes((search ?? "").toLowerCase()),
              )
              .map((item) => (
                <Select.Item
                  key={item.name.common}
                  value={item.cca2}
                  label={item.name.common}
                >
                  <View className="flex-row items-center gap-3 flex-1">
                    <Text className="text-2xl">{item.flag}</Text>
                    <Text className="text-base text-foreground flex-1">
                      {item.name.common}
                    </Text>
                  </View>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
          </ScrollView>
        </Select.Content>
      </Select.Portal>
    </Select>
  );
}
