import { Container } from "@/components/container";
import { useRouter } from "expo-router";
import { Card } from "heroui-native";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";

type ApplicationStatus = "pending" | "accepted" | "rejected";

type ApplicationItem = {
  id: string;
  institutionId: string;
  institutionName: string;
  program: string;
  status: ApplicationStatus;
  submittedAt: string;
};

const MOCK_APPLICATIONS: ApplicationItem[] = [
  {
    id: "1",
    institutionId: "1",
    institutionName: "Harvard University",
    program: "Bachelor of Computer Science",
    status: "pending",
    submittedAt: "2026-01-12",
  },
  {
    id: "2",
    institutionId: "2",
    institutionName: "Stanford University",
    program: "Master in Data Science",
    status: "accepted",
    submittedAt: "2025-12-03",
  },
  {
    id: "3",
    institutionId: "3",
    institutionName: "MIT",
    program: "Bachelor of Electrical Engineering",
    status: "rejected",
    submittedAt: "2025-11-20",
  },
];

function getStatusLabel(status: ApplicationStatus) {
  switch (status) {
    case "pending":
      return "Pending review";
    case "accepted":
      return "Accepted";
    case "rejected":
      return "Rejected";
  }
}

function getStatusClassName(status: ApplicationStatus) {
  switch (status) {
    case "pending":
      return "text-yellow-500";
    case "accepted":
      return "text-green-500";
    case "rejected":
      return "text-red-500";
  }
}

export default function Application() {
  const hasApplications = MOCK_APPLICATIONS.length > 0;
  const router = useRouter();

  return (
    <Container className="flex-1 bg-background pt-4">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
          flexGrow: 1,
        }}
      >
        <Text className="text-foreground text-xl font-semibold mb-4">
          My applications
        </Text>

        {!hasApplications && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-400 light:text-gray-700 text-base">
              You have not sent any applications yet.
            </Text>
          </View>
        )}

        {hasApplications && (
          <View className="flex-col gap-4">
            {MOCK_APPLICATIONS.map((application) => (
              <TouchableOpacity
                key={application.id}
                activeOpacity={0.8}
                onPress={() =>
                  router.push(`/institution/${application.institutionId}`)
                }
              >
                <Card className="p-4 gap-2">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="text-foreground font-semibold text-base">
                        {application.institutionName}
                      </Text>
                      <Text className="text-sm text-gray-400 light:text-gray-700 mt-1">
                        {application.program}
                      </Text>
                    </View>
                    <View className="items-end ml-3">
                      <Text className="text-xs text-gray-400 light:text-gray-700">
                        Status
                      </Text>
                      <Text
                        className={`text-sm font-medium ${getStatusClassName(application.status)}`}
                      >
                        {getStatusLabel(application.status)}
                      </Text>
                    </View>
                  </View>
                  <View className="mt-3">
                    <Text className="text-xs text-gray-400 light:text-gray-700">
                      Sent on {application.submittedAt}
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </Container>
  );
}
