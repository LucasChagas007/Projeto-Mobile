import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useTarefaStore } from "../../src/state/useTarefaStore";
import type { Prioridade } from "../../src/domain/tarefa";

export default function FormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const idParam = params.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  const criar = useTarefaStore((s) => s.criar);
  const atualizar = useTarefaStore((s) => s.atualizar);
  const tarefa = useTarefaStore((s) => (id ? s.buscarPorId(id) : undefined));

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState<Prioridade>("media");
  const [dataLimite, setDataLimite] = useState("");

  useEffect(() => {
    if (tarefa) {
      setTitulo(tarefa.titulo);
      setDescricao(tarefa.descricao ?? "");
      setPrioridade(tarefa.prioridade);
      setDataLimite(tarefa.dataLimite ?? "");
    }
  }, [tarefa]);

  const modo = id ? "Editar tarefa" : "Criar tarefa";

  const salvar = () => {
    // P02: sem validação ainda (isso entra no próximo passo)
    if (id && tarefa) {
      atualizar(id, {
        titulo,
        descricao: descricao || undefined,
        prioridade,
        dataLimite: dataLimite || undefined,
      });

      router.replace(`/tarefa/${id}`);
      return;
    }

    const nova = criar({
      titulo: titulo || "Tarefa sem título (P02)",
      descricao: descricao || undefined,
      prioridade,
      dataLimite: dataLimite || undefined,
    });

    router.replace(`/tarefa/${nova.id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{modo}</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Estudar Mobile"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 90 }]}
        placeholder="Opcional"
        multiline
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Prioridade</Text>
      <View style={styles.row}>
        {(["baixa", "media", "alta"] as Prioridade[]).map((p) => (
          <Pressable
            key={p}
            style={[styles.pill, prioridade === p && styles.pillActive]}
            onPress={() => setPrioridade(p)}
          >
            <Text style={[styles.pillText, prioridade === p && styles.pillTextActive]}>
              {p.toUpperCase()}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Data limite (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 2026-01-30"
        value={dataLimite}
        onChangeText={setDataLimite}
      />

      <Pressable style={styles.btnBlue} onPress={salvar}>
        <Text style={styles.btnText}>Salvar</Text>
      </Pressable>

      <Pressable style={styles.btnOutline} onPress={() => router.back()}>
        <Text style={styles.btnOutlineText}>Cancelar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: "900" },

  label: { fontSize: 13, fontWeight: "800", opacity: 0.7 },
  input: { borderWidth: 1, borderRadius: 12, padding: 12 },

  row: { flexDirection: "row", gap: 8 },
  pill: { flex: 1, borderWidth: 1, borderRadius: 999, padding: 10, alignItems: "center" },
  pillActive: { backgroundColor: "#2563eb", borderColor: "#2563eb" },
  pillText: { fontWeight: "900" },
  pillTextActive: { color: "#fff" },

  btnBlue: { backgroundColor: "#2563eb", padding: 14, borderRadius: 12, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "900" },

  btnOutline: { borderWidth: 1, borderRadius: 12, padding: 14, alignItems: "center" },
  btnOutlineText: { fontWeight: "900" },
});
