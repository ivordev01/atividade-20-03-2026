import { useRef } from "react";
import { Button, TextInput, View } from "react-native";

export default function Index() {
  const inputRef = useRef<TextInput>(null);
  function focusInput() {
    inputRef.current?.focus();
  }
  return (
    <View>
      <TextInput
        ref={inputRef}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 20,
          marginTop: 20,
        }}
      />
      <Button title="Focar" onPress={focusInput} />
    </View>
  );
}
