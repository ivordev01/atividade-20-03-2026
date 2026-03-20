import { AuthProvider } from "@/hooks/useauth";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />

        <Stack.Screen
          name="user/[id]"
          options={{ title: "Detalhe do Usuário" }}
        />
      </Stack>
    </AuthProvider>
  );
}
