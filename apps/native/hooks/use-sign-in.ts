import { useMutation } from "@tanstack/react-query";

import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/utils/orpc";

type SignInVariables = {
  email: string;
  password: string;
};

export function useSignIn() {
  return useMutation({
    mutationFn: ({ email, password }: SignInVariables) =>
      new Promise<void>((resolve, reject) => {
        authClient.signIn.email(
          { email, password },
          {
            onError(error) {
              reject(
                new Error(error.error?.message || "Failed to sign in"),
              );
            },
            onSuccess() {
              resolve();
            },
          },
        );
      }),
    onSuccess: () => {
      // После успешного входа обновляем все связанные сессией запросы
      queryClient.refetchQueries();
    },
  });
}

