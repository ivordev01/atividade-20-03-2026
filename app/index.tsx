import { useCallback, useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  const [count, setCount] = useState<number>(0);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <View>
      <Text>Contagem: {count}</Text>
      <Button title="Incrementar" onPress={increment} />
    </View>
  );
}
