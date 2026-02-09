import { View } from "react-native";

interface TagInputContentProps {
  children: React.ReactNode[] | React.ReactNode;
}

export default function TagInputContent({ children }: TagInputContentProps) {
  return <View className="flex flex-row flex-wrap gap-2">{children}</View>;
}
