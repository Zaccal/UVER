import { Container } from "@/components/container";
import { orpc } from "@/utils/orpc";
import { useRouter } from "expo-router";
import { Card, Spinner } from "heroui-native";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";

type ApplicationStatus = "pending" | "approved" | "rejected";

type ApplicationItem = {
  id: string;
  institutionId: string;
  institutionName: string;
  institutionImage: string;
  program: string;
  message: string | null;
  status: ApplicationStatus;
  createdAt: string | Date;
};

function getStatusLabel(status: ApplicationStatus) {
  switch (status) {
    case "pending":
      return "Pending review";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
  }
}

function getStatusClassName(status: ApplicationStatus) {
  switch (status) {
    case "pending":
      return "text-yellow-500";
    case "approved":
      return "text-green-500";
    case "rejected":
      return "text-red-500";
  }
}

export default function Application() {
  const router = useRouter();

  const applicationsQuery = useQuery(orpc.applications.list.queryOptions());
  const applications = applicationsQuery.data ?? [];
  const hasApplications = applications.length > 0;

  if (applicationsQuery.isLoading) {
    return (
      <Container className="flex-1 bg-background items-center justify-center">
        <Spinner size="lg" color="default" />
      </Container>
    );
  }

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
            {applications.map((application) => (
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
                      Sent on {new Date(application.createdAt).toDateString()}
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
