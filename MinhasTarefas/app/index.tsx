/// path: app/index.tsx
import { useRouter } from "expo-router";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { TaskListItem } from "../src/components/TaskListItem";
import { useTasksStore } from "../src/state/tasks.store";

export default function ListaScreen() {
  const router = useRouter();

  // Fonte de verdade: store Zustand
  const tasks = useTasksStore((s) => s.tasks);
  const error = useTasksStore((s) => s.error);

  const seedSample = useTasksStore((s) => s.seedSample);
  const toggleDone = useTasksStore((s) => s.toggleDone);
  const removeTask = useTasksStore((s) => s.removeTask);
  const clearError = useTasksStore((s) => s.clearError);

  const goCreate = () => router.push("/tarefa/form");

  const goDetail = (id: string) => {
    router.push({ pathname: "/tarefa/[id]", params: { id } });
  };

  const confirmRemove = (id: string) => {
    Alert.alert(
      "Remover tarefa",
      "Tem certeza que deseja remover esta tarefa?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => removeTask(id),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ gap: 2 }}>
          <Text style={styles.title}>Tarefas</Text>
          <Text style={styles.subtitle}>Total: {tasks.length}</Text>
        </View>

        <View style={styles.headerActions}>
          {/* Útil para testar antes do Form real (mantém no P05) */}
          <Pressable style={styles.btnOutline} onPress={seedSample}>
            <Text style={styles.btnOutlineText}>Exemplos</Text>
          </Pressable>

          <Pressable style={styles.btnPrimary} onPress={goCreate}>
            <Text style={styles.btnPrimaryText}>+ Nova</Text>
          </Pressable>
        </View>
      </View>

      {/* Error state (opcional, mas recomendado) */}
      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.btnOutline} onPress={clearError}>
            <Text style={styles.btnOutlineText}>Limpar</Text>
          </Pressable>
        </View>
      ) : null}

      {/* Lista */}
      <FlatList
        data={tasks}
        keyExtractor={(t) => t.id} // nunca usar index!
        contentContainerStyle={[
          styles.listContent,
          tasks.length === 0 ? { flex: 1 } : null,
        ]}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Nenhuma tarefa cadastrada</Text>
            <Text style={styles.emptySubtitle}>
              Crie sua primeira tarefa para começar.
            </Text>

            <View style={styles.emptyActions}>
              <Pressable style={styles.btnPrimary} onPress={goCreate}>
                <Text style={styles.btnPrimaryText}>Criar primeira tarefa</Text>
              </Pressable>

              <Pressable style={styles.btnOutline} onPress={seedSample}>
                <Text style={styles.btnOutlineText}>Carregar exemplos</Text>
              </Pressable>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <TaskListItem
            task={item}
            onPress={() => goDetail(item.id)}
            onToggleDone={() => toggleDone(item.id)}
            onRemove={() => confirmRemove(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 12,
  },
  title: { fontSize: 22, fontWeight: "900" },
  subtitle: { opacity: 0.7 },

  headerActions: { flexDirection: "row", gap: 8 },

  btnPrimary: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  btnPrimaryText: { color: "#fff", fontWeight: "900" },

  btnOutline: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  btnOutlineText: { fontWeight: "900" },

  errorBox: {
    borderWidth: 1,
    borderColor: "#b91c1c",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
  },
  errorText: { color: "#b91c1c", fontWeight: "900", flex: 1 },

  listContent: { paddingVertical: 6 },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 16,
  },
  emptyTitle: { fontSize: 18, fontWeight: "900" },
  emptySubtitle: { opacity: 0.7, textAlign: "center" },
  emptyActions: { flexDirection: "row", gap: 10, marginTop: 8 },
});
