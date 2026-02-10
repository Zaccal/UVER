import { institutionContext } from "@/components/institutionsCard/institution-context";
import { Ionicons } from "@expo/vector-icons";
import { Card, cn } from "heroui-native";
import dayjs from 'dayjs'

interface InstitutionsCardApplicationDeadlineProps {
  className?: string
}

export function InstitutionsCardApplicationDeadline({ className }: InstitutionsCardApplicationDeadlineProps) {
  const deadline = institutionContext.useSelect(state => state.applicationDeadline)
  console.log(deadline)

  return (
    <Card.Description className={cn("text-sm", className)}>
      <Ionicons name="calendar-outline" size={16} /> Application deadline: {dayjs(deadline).format("MMM, DD")}
    </Card.Description>
  );
}
