import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function FormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // aqui o id vem via query: /tarefa/form?id=demo
  const idParam = params.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  const modo = id ? "Editar tarefa" : "Criar tarefa";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form (placeholder)</Text>

      <View style={styles.card}>
        <Text style={styles.mode}>{modo}</Text>
        <Text style={styles.info}>
          {id ? `ID recebido: ${id}` : "Sem ID (modo criar)"}
        </Text>
      </View>

      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Salvar (placeholder) ✓</Text>
      </Pressable>

      <Pressable style={styles.buttonOutline} onPress={() => router.back()}>
        <Text style={styles.buttonOutlineText}>Cancelar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 14, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "800" },
  card: { borderWidth: 1, borderRadius: 12, padding: 14, gap: 6 },
  mode: { fontSize: 18, fontWeight: "900" },
  info: { fontSize: 14, opacity: 0.7 },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "800" },
  buttonOutline: {
    borderWidth: 1,
    borderColor: "#111827",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonOutlineText: { color: "#111827", fontWeight: "800" },
});
