import { useRouter } from "expo-router";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { useTarefaStore } from "../src/state/useTarefaStore";

export default function ListaScreen() {
  const router = useRouter();
  const tarefas = useTarefaStore((s) => s.tarefas);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista</Text>

        <Pressable
          style={styles.newBtn}
          onPress={() => router.push("/tarefa/form")}
        >
          <Text style={styles.newBtnText}>+ Nova</Text>
        </Pressable>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={{ opacity: 0.7 }}>Nenhuma tarefa cadastrada.</Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, item.concluida && styles.cardDone]}
            onPress={() => router.push(`/tarefa/${item.id}`)}
          >
            <Text style={styles.cardTitle}>
              {item.concluida ? "✅ " : ""}{item.titulo}
            </Text>
            <Text style={styles.meta}>
              Prioridade: {item.prioridade.toUpperCase()}
              {item.dataLimite ? ` • Limite: ${item.dataLimite}` : ""}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 22, fontWeight: "800" },
  newBtn: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  newBtnText: { color: "#fff", fontWeight: "800" },

  card: { borderWidth: 1, borderRadius: 12, padding: 14, gap: 6, marginBottom: 10 },
  cardDone: { opacity: 0.6 },
  cardTitle: { fontSize: 16, fontWeight: "800" },
  meta: { opacity: 0.7 },
});
