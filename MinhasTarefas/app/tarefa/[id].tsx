import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTarefaStore } from "../../src/state/useTarefaStore";

export default function DetalheScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const idParam = params.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  const tarefa = useTarefaStore((s) => (id ? s.buscarPorId(id) : undefined));
  const alternar = useTarefaStore((s) => s.alternarConcluida);
  const remover = useTarefaStore((s) => s.remover);

  if (!id || !tarefa) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tarefa não encontrada</Text>
        <Pressable style={styles.btn} onPress={() => router.replace("/")}>
          <Text style={styles.btnText}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhe</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Título</Text>
        <Text style={styles.value}>{tarefa.titulo}</Text>

        <Text style={styles.label}>Descrição</Text>
        <Text style={styles.value}>{tarefa.descricao || "—"}</Text>

        <Text style={styles.label}>Prioridade</Text>
        <Text style={styles.value}>{tarefa.prioridade.toUpperCase()}</Text>

        <Text style={styles.label}>Data limite</Text>
        <Text style={styles.value}>{tarefa.dataLimite || "—"}</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{tarefa.concluida ? "Concluída" : "Pendente"}</Text>
      </View>

      <Pressable
        style={[styles.btn, styles.btnGreen]}
        onPress={() => alternar(tarefa.id)}
      >
        <Text style={styles.btnText}>
          {tarefa.concluida ? "Marcar como pendente" : "Marcar como concluída"}
        </Text>
      </Pressable>

      <Pressable
        style={[styles.btn, styles.btnBlue]}
        onPress={() => router.push({ pathname: "/tarefa/form", params: { id: tarefa.id } })}
      >
        <Text style={styles.btnText}>Editar</Text>
      </Pressable>

      <Pressable
        style={[styles.btn, styles.btnRed]}
        onPress={() => {
          remover(tarefa.id);
          router.replace("/");
        }}
      >
        <Text style={styles.btnText}>Excluir</Text>
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

  label: { fontSize: 13, fontWeight: "800", opacity: 0.7 },
  value: { fontSize: 15 },

  btn: { padding: 14, borderRadius: 12, alignItems: "center" },
  btnGreen: { backgroundColor: "#16a34a" },
  btnBlue: { backgroundColor: "#2563eb" },
  btnRed: { backgroundColor: "#b91c1c" },
  btnText: { color: "#fff", fontWeight: "900" },

  btnOutline: { borderWidth: 1, borderRadius: 12, padding: 14, alignItems: "center" },
  btnOutlineText: { fontWeight: "900" },
});
