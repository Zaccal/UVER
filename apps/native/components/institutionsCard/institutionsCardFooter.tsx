import { Card, cn } from "heroui-native";

interface institutionsCardFooterProps {
  children: React.ReactElement | React.ReactElement[]
  className?: string
}

export default function institutionsCardFooter({ children, className }: institutionsCardFooterProps) {
  return (
    <Card.Footer className={cn("mt-3", className)}>
      {children}
    </Card.Footer>
  );
}
