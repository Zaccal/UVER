import { cn } from "heroui-native";
import { type PropsWithChildren } from "react";
import { View, type ViewProps } from "react-native";
import Animated, { type AnimatedProps } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedView = Animated.createAnimatedComponent(View);

type Props = AnimatedProps<ViewProps> & {
  className?: string;
};

export function Container({
  children,
  className,
  ...props
}: PropsWithChildren<Props>) {
  const insets = useSafeAreaInsets();

  return (
    <AnimatedView
      className={cn("flex-1 bg-background px-6", className)}
      style={{
        paddingBottom: insets.bottom,
      }}
      {...props}
    >
      {children}
    </AnimatedView>
  );
}
