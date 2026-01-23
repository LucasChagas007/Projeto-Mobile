/// path: app/tarefa/[id].tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useTasksStore } from "../../src/state/tasks.store";

export default function TaskDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // id da rota dinâmica: /tarefa/[id]
  const idParam = params.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  // Source of truth: store Zustand
  const tasks = useTasksStore((s) => s.tasks);
  const toggleDone = useTasksStore((s) => s.toggleDone);
  const removeTask = useTasksStore((s) => s.removeTask);

  const task = id ? tasks.find((t) => t.id === id) : undefined;

  const goBackToList = () => router.replace("/");

  const goEdit = () => {
    if (!task) return;
    router.push({ pathname: "/tarefa/form", params: { id: task.id } });
  };

  const confirmRemove = () => {
    if (!task) return;

    Alert.alert(
      "Remover tarefa",
      "Tem certeza que deseja remover esta tarefa?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => {
            removeTask(task.id);
            router.replace("/");
          },
        },
      ]
    );
  };

  // UI defensiva: id inválido
  if (!id) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Detalhe</Text>

        <View style={styles.card}>
          <Text style={styles.errorTitle}>ID inválido</Text>
          <Text style={styles.errorText}>
            Não foi possível identificar a tarefa. Volte para a lista e tente novamente.
          </Text>
        </View>

        <Pressable style={styles.btnPrimary} onPress={goBackToList}>
          <Text style={styles.btnPrimaryText}>Voltar para a Lista</Text>
        </Pressable>
      </View>
    );
  }

  // UI defensiva: tarefa não encontrada
  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Detalhe</Text>

        <View style={styles.card}>
          <Text style={styles.errorTitle}>Tarefa não encontrada</Text>
          <Text style={styles.errorText}>
            A tarefa pode ter sido removida ou o ID não existe mais.
          </Text>

          <Text style={styles.metaSmall}>ID: {id}</Text>
        </View>

        <Pressable style={styles.btnPrimary} onPress={goBackToList}>
          <Text style={styles.btnPrimaryText}>Voltar para a Lista</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhe</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Título</Text>
        <Text style={[styles.value, task.done && styles.valueDone]}>
          {task.title}
        </Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{task.done ? "Concluída ✅" : "Pendente ⬜"}</Text>

        <Text style={styles.label}>Notas</Text>
        <Text style={styles.value}>{task.notes ? task.notes : "—"}</Text>

        <Text style={styles.label}>Datas</Text>
        <Text style={styles.metaSmall}>Criada: {task.createdAtISO}</Text>
        {task.updatedAtISO ? (
          <Text style={styles.metaSmall}>Atualizada: {task.updatedAtISO}</Text>
        ) : null}

        <Text style={styles.metaSmall}>ID: {task.id}</Text>
      </View>

      <Pressable
        style={[styles.btnPrimary, styles.btnToggle]}
        onPress={() => toggleDone(task.id)}
      >
        <Text style={styles.btnPrimaryText}>
          {task.done ? "Desfazer conclusão" : "Concluir tarefa"}
        </Text>
      </Pressable>

      <Pressable style={[styles.btnPrimary, styles.btnEdit]} onPress={goEdit}>
        <Text style={styles.btnPrimaryText}>Editar</Text>
      </Pressable>

      <Pressable style={[styles.btnPrimary, styles.btnRemove]} onPress={confirmRemove}>
        <Text style={styles.btnPrimaryText}>Remover</Text>
      </Pressable>

      <Pressable style={styles.btnOutline} onPress={() => router.back()}>
        <Text style={styles.btnOutlineText}>← Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: "900" },

  card: { borderWidth: 1, borderRadius: 12, padding: 14, gap: 8 },

  label: { fontSize: 13, fontWeight: "900", opacity: 0.7 },
  value: { fontSize: 16, fontWeight: "800" },
  valueDone: { opacity: 0.6, textDecorationLine: "line-through" },

  metaSmall: { fontSize: 12, opacity: 0.7 },

  errorTitle: { fontSize: 16, fontWeight: "900" },
  errorText: { opacity: 0.8 },

  btnPrimary: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  btnPrimaryText: { color: "#fff", fontWeight: "900" },

  btnToggle: { backgroundColor: "#16a34a" },
  btnEdit: { backgroundColor: "#2563eb" },
  btnRemove: { backgroundColor: "#b91c1c" },

  btnOutline: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  btnOutlineText: { fontWeight: "900" },
});
