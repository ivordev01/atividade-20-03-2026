import { useAuth } from "@/hooks/useauth";
import { Button, Text, View } from "react-native";

export default function Index() {
  const { user, login, logout } = useAuth();

  return (
    <View>
      {user ? (
        <>
          <Text>Bem-vindo, {user.nome}!</Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <>
          <Text>Você não está logado.</Text>
          <Button title="Login" onPress={() => login("João")} />
        </>
      )}
    </View>
  );
}
