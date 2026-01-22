import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function DetalheScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // id pode ser string | string[] | undefined
  const idParam = params.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhe (placeholder)</Text>

      <View style={styles.card}>
        <Text style={styles.label}>ID recebido pela rota dinâmica:</Text>
        <Text style={styles.value}>{id ?? "ID inválido/ausente"}</Text>
      </View>

      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>← Voltar</Text>
      </Pressable>

      <Pressable
        style={styles.buttonOutline}
        onPress={() =>
          router.push({
            pathname: "/tarefa/form",
            params: { id: id ?? "demo" }, // manda id via query param
          })
        }
      >
        <Text style={styles.buttonOutlineText}>Editar (placeholder) →</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 14, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "800" },
  card: { borderWidth: 1, borderRadius: 12, padding: 14, gap: 6 },
  label: { fontSize: 14, opacity: 0.7 },
  value: { fontSize: 18, fontWeight: "900" },
  button: {
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "800" },
  buttonOutline: {
    borderWidth: 1,
    borderColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonOutlineText: { color: "#2563eb", fontWeight: "800" },
});
