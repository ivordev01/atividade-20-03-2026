import { CartProvider } from "@/context/CartContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Produtos" }} />
        <Stack.Screen
          name="produto/[id]"
          options={{ title: "Detalhe do Produto" }}
        />
        <Stack.Screen
          name="user/[id]"
          options={{ title: "Detalhe do Usuário" }}
        />
      </Stack>
    </CartProvider>
  );
}
