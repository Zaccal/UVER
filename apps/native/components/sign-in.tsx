import { Button, ErrorView, Spinner, Surface, TextField } from "heroui-native";
import { useState } from "react";
import { Text, View } from "react-native";

import { useSignIn } from "@/hooks/use-sign-in";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const signInMutation = useSignIn();

  function handleLogin() {
    setError(null);
    signInMutation.mutate(
      { email, password },
      {
        onError(err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Failed to sign in");
          }
        },
        onSuccess() {
          setEmail("");
          setPassword("");
        },
      },
    );
  }

  return (
    <Surface variant="secondary" className="p-4 rounded-lg">
      <Text className="text-foreground font-medium mb-4">Sign In</Text>

      <ErrorView isInvalid={!!error} className="mb-3">
        {error}
      </ErrorView>

      <View className="gap-3">
        <TextField>
          <TextField.Label>Email</TextField.Label>
          <TextField.Input
            value={email}
            onChangeText={setEmail}
            placeholder="email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </TextField>

        <TextField>
          <TextField.Label>Password</TextField.Label>
          <TextField.Input
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />
        </TextField>

        <Button
          onPress={handleLogin}
          isDisabled={signInMutation.isPending}
          className="mt-1"
        >
          {signInMutation.isPending ? (
            <Spinner size="sm" color="default" />
          ) : (
            <Button.Label>Sign In</Button.Label>
          )}
        </Button>
      </View>
    </Surface>
  );
}

export { SignIn };
