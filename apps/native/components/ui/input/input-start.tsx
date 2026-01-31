import { View } from "react-native";

interface InputStartProps {
  children: React.ReactNode;
}

export function InputStart({ children }: InputStartProps) {
  return (
    <View className="flex-row items-center">
      {children}
    </View>
  );
}
