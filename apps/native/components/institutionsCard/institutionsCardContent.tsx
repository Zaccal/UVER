import { Card } from "heroui-native";

interface institutionsCardContentProps {
  children: React.ReactElement | React.ReactElement[];
}

export default function institutionsCardContent({ children }: institutionsCardContentProps) {
  return (
    <Card.Body className="p-4">
      {children}
    </Card.Body>
  );
}
