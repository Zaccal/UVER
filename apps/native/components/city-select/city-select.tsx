import { Button, Select, TextField } from "heroui-native";
import { City } from "country-state-city";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

interface SelectCityProps {
  country: string;
  onValueChange: (value: string | null) => void;
}

export default function SelectCity({
  country,
  onValueChange,
}: SelectCityProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const cities = City.getCitiesOfCountry(country) ?? [];

  return (
    <>
      <Select
        value={{
          label: selectedCity || "Select City",
          value: selectedCity || "",
        }}
        onValueChange={(value) => {
          const selected = cities.find((data) => data.name === value?.label);
          setSelectedCity(selected?.name ?? "");
          onValueChange(selected?.name ?? null);
        }}
      >
        <Select.Trigger asChild>
          <Button variant="tertiary" size="sm">
            {selectedCity ? (
              <View className="flex-row items-center gap-2">
                <Text className="text-base">{selectedCity}</Text>
              </View>
            ) : (
              <Text className="text-foreground">Select City</Text>
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
              <Select.ListLabel>City</Select.ListLabel>
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
              {cities
                .filter((city) =>
                  city.name.toLowerCase().includes(search.toLowerCase()),
                )
                .map((item, index) => (
                  <Select.Item key={index} value={item.name} label={item.name}>
                    <View className="flex-row items-center gap-3 flex-1">
                      <Text className="text-base text-foreground flex-1">
                        {item.name}
                      </Text>
                    </View>
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
            </ScrollView>
          </Select.Content>
        </Select.Portal>
      </Select>
    </>
  );
}
