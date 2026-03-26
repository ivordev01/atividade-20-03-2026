import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View>
      <Link href="/user/1?nome=joao">
        <Text>Ir para ID 1</Text>
      </Link>
      <Link href="/user/2?nome=sandro">
        <Text>Ir para ID 2</Text>
      </Link>
    </View>
  );
}
