import { institutionContext } from "@/contexts/institution-context";
import { Ionicons } from "@expo/vector-icons";
import { Card, cn } from "heroui-native";
import dayjs from 'dayjs'

interface InstitutionsCardApplicationDeadlineProps {
  className?: string
}

export function InstitutionsCardApplicationDeadline({ className }: InstitutionsCardApplicationDeadlineProps) {
  const deadline = institutionContext.useSelect(state => state.data.applicationDeadline)

  return (
    <Card.Description className={cn("text-sm", className)}>
      <Ionicons name="calendar-outline" size={16} /> Application deadline: {dayjs(deadline).format("MMM, DD")}
    </Card.Description>
  );
}
