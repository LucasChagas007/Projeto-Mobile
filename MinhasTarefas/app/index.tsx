import { useRouter } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function ListaScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista (placeholder)</Text>
      <Text style={styles.subtitle}>
        P01: Navegação mínima com Expo Router
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/tarefa/form")}
      >
        <Text style={styles.buttonText}>Nova tarefa →</Text>
      </Pressable>

      <Pressable
        style={styles.buttonOutline}
        onPress={() =>
          router.push({ pathname: "/tarefa/[id]", params: { id: "demo" } })
        }
      >
        <Text style={styles.buttonOutlineText}>Abrir detalhe (demo) →</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", gap: 12 },
  title: { fontSize: 22, fontWeight: "800" },
  subtitle: { fontSize: 14, opacity: 0.7 },
  button: {
    backgroundColor: "#2563eb",
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
