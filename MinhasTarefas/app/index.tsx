/// path: app/index.tsx
import { useRouter } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTasksStore } from "../src/state/tasks.store";

export default function ListaScreen() {
  const router = useRouter();

  const tasks = useTasksStore((s) => s.tasks);
  const isLoading = useTasksStore((s) => s.isLoading);
  const error = useTasksStore((s) => s.error);

  const seedSample = useTasksStore((s) => s.seedSample);
  const toggleDone = useTasksStore((s) => s.toggleDone);
  const removeTask = useTasksStore((s) => s.removeTask);
  const clearError = useTasksStore((s) => s.clearError);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista (Painel P04)</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Tasks: <Text style={styles.bold}>{tasks.length}</Text>
        </Text>
        <Text style={styles.infoText}>
          Loading: <Text style={styles.bold}>{String(isLoading)}</Text>
        </Text>
      </View>

      <Pressable style={styles.btnBlue} onPress={seedSample}>
        <Text style={styles.btnText}>Carregar exemplos</Text>
      </Pressable>

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>Erro: {error}</Text>
          <Pressable style={styles.btnOutline} onPress={clearError}>
            <Text style={styles.btnOutlineText}>Limpar erro</Text>
          </Pressable>
        </View>
      )}

      <View style={{ height: 10 }} />

      {tasks.length === 0 ? (
        <Text style={styles.empty}>Nenhuma task. Use “Carregar exemplos”.</Text>
      ) : (
        <View style={{ gap: 10 }}>
          {tasks.map((task) => (
            <View key={task.id} style={styles.card}>
              <Text style={styles.cardTitle}>
                {task.done ? "✅ " : "⬜ "} {task.title}
              </Text>

              <Text style={styles.meta}>
                id: {task.id}
                {"\n"}createdAtISO: {task.createdAtISO}
                {task.updatedAtISO ? `\nupdatedAtISO: ${task.updatedAtISO}` : ""}
              </Text>

              <View style={styles.row}>
                <Pressable
                  style={styles.btnGreen}
                  onPress={() => toggleDone(task.id)}
                >
                  <Text style={styles.btnText}>
                    {task.done ? "Desfazer" : "Concluir"}
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.btnRed}
                  onPress={() => removeTask(task.id)}
                >
                  <Text style={styles.btnText}>Remover</Text>
                </Pressable>

                <Pressable
                  style={styles.btnOutline}
                  onPress={() => router.push(`/tarefa/${task.id}`)}
                >
                  <Text style={styles.btnOutlineText}>Abrir</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      )}

      <View style={{ height: 16 }} />

      {/* Navegação mínima (continua útil para conferir rotas do P01) */}
      <View style={styles.row}>
        <Pressable style={styles.btnOutline} onPress={() => router.push("/tarefa/form")}>
          <Text style={styles.btnOutlineText}>Ir para Form</Text>
        </Pressable>

        <Pressable
          style={styles.btnOutline}
          onPress={() => router.push({ pathname: "/tarefa/[id]", params: { id: "demo" } })}
        >
          <Text style={styles.btnOutlineText}>Detalhe demo</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: "900" },

  infoBox: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 6,
  },
  infoText: { fontSize: 14, opacity: 0.85 },
  bold: { fontWeight: "900" },

  empty: { opacity: 0.7, fontSize: 14 },

  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  cardTitle: { fontSize: 16, fontWeight: "900" },
  meta: { fontSize: 12, opacity: 0.75 },

  row: { flexDirection: "row", gap: 8, flexWrap: "wrap" },

  btnBlue: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  btnGreen: {
    backgroundColor: "#16a34a",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    minWidth: 90,
  },
  btnRed: {
    backgroundColor: "#b91c1c",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    minWidth: 90,
  },
  btnText: { color: "#fff", fontWeight: "900" },

  btnOutline: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    minWidth: 90,
  },
  btnOutlineText: { fontWeight: "900" },

  errorBox: {
    borderWidth: 1,
    borderColor: "#b91c1c",
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  errorText: { color: "#b91c1c", fontWeight: "900" },
});
