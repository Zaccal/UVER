import { cn } from "heroui-native";
import type { TextInputProps } from "react-native";
import { TextInput, } from "react-native";



export function InputField(props: TextInputProps) {
  return (
    <>
      <TextInput className={cn("w-fit py-4", props)} {...props} />
    </>
  );
}
