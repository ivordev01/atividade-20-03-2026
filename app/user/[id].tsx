import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function User() {
  const { id, nome } = useLocalSearchParams();

  return (
    <View>
      <Text>ID: {id}</Text>
      <Text>Nome: {nome}</Text>
    </View>
  );
}
