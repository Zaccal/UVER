import { institutionContext } from "@/components/institutionsCard/institution-context";
import { orpc, queryClient } from "@/utils/orpc";
import { useMutation } from "@tanstack/react-query";
import { Button, Dialog, ErrorView, Spinner, TextField } from "heroui-native";
import React from "react";
import { KeyboardAvoidingView, View } from "react-native";

interface InstitutionsCardApplyProps {
  className?: string;
}

export function InstitutionsCardApply({
  className,
}: InstitutionsCardApplyProps) {
  const institution = institutionContext.useSelect((v) => v);

  const [isOpen, setIsOpen] = React.useState(false);
  const [program, setProgram] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const applyMutation = useMutation(
    orpc.applications.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: orpc.applications.key() });
        setIsOpen(false);
        setProgram("");
        setMessage("");
      },
      onError: (err) => {
        setError(err instanceof Error ? err.message : "Failed to apply");
      },
    }),
  );

  React.useEffect(() => {
    if (!isOpen) {
      setError(null);
    }
  }, [isOpen]);

  return (
    <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button
          className={className}
          onPress={(e) => {
            e?.stopPropagation?.();
            setIsOpen(true);
          }}
        >
          Apply
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <KeyboardAvoidingView behavior="padding">
          <Dialog.Content>
            <Dialog.Close />
            <Dialog.Title>Apply</Dialog.Title>

            <ErrorView isInvalid={!!error} className="mt-3">
              {error}
            </ErrorView>

            <View className="gap-3 mt-3">
              <TextField>
                <TextField.Label>Program</TextField.Label>
                <TextField.Input
                  value={program}
                  onChangeText={setProgram}
                  placeholder="e.g. Bachelor of Computer Science"
                />
              </TextField>

              <TextField>
                <TextField.Label>Message (optional)</TextField.Label>
                <TextField.Input
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Tell us about yourself"
                />
              </TextField>

              <Button
                onPress={() => {
                  setError(null);
                  applyMutation.mutate({
                    institutionId: institution.id,
                    program,
                    message: message || undefined,
                  });
                }}
                isDisabled={!program || applyMutation.isPending}
              >
                {applyMutation.isPending ? (
                  <Spinner size="sm" color="default" />
                ) : (
                  <Button.Label>Submit</Button.Label>
                )}
              </Button>
            </View>
          </Dialog.Content>
        </KeyboardAvoidingView>
      </Dialog.Portal>
    </Dialog>
  );
}
