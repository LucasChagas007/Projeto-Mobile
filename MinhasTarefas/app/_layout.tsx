import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Lista" }} />
      <Stack.Screen name="tarefa/form" options={{ title: "Formulário" }} />
      <Stack.Screen name="tarefa/[id]" options={{ title: "Detalhe" }} />
    </Stack>
  );
}
