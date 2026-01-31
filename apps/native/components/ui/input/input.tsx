import { cn } from "heroui-native";
import { View } from "react-native";
import { InputStart } from "./input-start";
import { InputEnd } from "./input-end";

interface InputProps {
  children: React.ReactElement[] | React.ReactElement;
  className?: string;
}

export function Input({ children, className }: InputProps) {
  return (
    <View className={cn("bg-default rounded-3xl pl-4 pr-4", className)}>
      <View className="flex-row justify-between items-center">
        <View className="flex-row gap-2 items-center">
          {Array.isArray(children) ? children.filter(child => child.type === InputStart) : null}
          {Array.isArray(children) ? children.filter(child => child.type !== InputStart && child.type !== InputEnd) : children}
        </View>
        {Array.isArray(children) ? children.filter(child => child.type === InputEnd) : null}
      </View>
    </View>
  );
}
