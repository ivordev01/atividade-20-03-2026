import { useMemo, useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  const [numero, setNumero] = useState<number>(0);

  const dobro = useMemo(() => {
    return numero * 2;
  }, [numero]);

  return (
    <View>
      <Text>Numero: {numero}</Text>
      <Text>Dobro: {dobro}</Text>
      <Button title="Aumentar" onPress={() => setNumero((prev) => prev + 1)} />
    </View>
  );
}
