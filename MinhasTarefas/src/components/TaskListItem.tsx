/// path: src/components/TaskListItem.tsx
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Task } from "../domain/task.types";

type Props = {
  task: Task;
  onPress: () => void;
  onToggleDone: () => void;
  onRemove?: () => void;
};

export function TaskListItem({ task, onPress, onToggleDone, onRemove }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.left}>
        <Text style={[styles.title, task.done && styles.titleDone]} numberOfLines={1}>
          {task.title}
        </Text>

        {!!task.notes && (
          <Text style={styles.notes} numberOfLines={2}>
            {task.notes}
          </Text>
        )}

        <Text style={styles.meta}>
          {task.done ? "Concluída" : "Pendente"}
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={[styles.smallBtn, styles.btnToggle]}
          onPress={(e) => {
            e.stopPropagation();
            onToggleDone();
          }}
        >
          <Text style={styles.smallBtnText}>
            {task.done ? "Desfazer" : "Concluir"}
          </Text>
        </Pressable>

        {onRemove ? (
          <Pressable
            style={[styles.smallBtn, styles.btnRemove]}
            onPress={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <Text style={styles.smallBtnText}>Remover</Text>
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  left: { flex: 1, gap: 6 },
  title: { fontSize: 16, fontWeight: "900" },
  titleDone: { opacity: 0.55, textDecorationLine: "line-through" },
  notes: { fontSize: 13, opacity: 0.8 },
  meta: { fontSize: 12, opacity: 0.65 },

  actions: { gap: 8, alignItems: "flex-end" },
  smallBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: "center",
    minWidth: 92,
  },
  btnToggle: { backgroundColor: "#2563eb" },
  btnRemove: { backgroundColor: "#b91c1c" },
  smallBtnText: { color: "#fff", fontWeight: "900", fontSize: 12 },
});