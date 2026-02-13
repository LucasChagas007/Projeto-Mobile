/// path: app/tarefa/form.tsx
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { taskFormSchema, type TaskFormValues } from "../../src/domain/task.schema";
import { useTasksStore } from "../../src/state/tasks.store";

function normalizeNotes(notes?: string): string | undefined {
  const trimmed = (notes ?? "").trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export default function TaskFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const idParam = params.id;
  const taskId = Array.isArray(idParam) ? idParam[0] : idParam;
  const isEditMode = typeof taskId === "string" && taskId.length > 0;

  const tasks = useTasksStore((s) => s.tasks);
  const addTask = useTasksStore((s) => s.addTask);
  const updateTask = useTasksStore((s) => s.updateTask);

  const task = isEditMode ? tasks.find((t) => t.id === taskId) : undefined;

  const initialValues = useMemo<TaskFormValues>(
    () => ({
      title: task?.title ?? "",
      notes: task?.notes ?? "",
    }),
    [task?.id, task?.title, task?.notes]
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    mode: "onTouched",
    defaultValues: initialValues,
  });

  // Importante para atualizar prefill quando entrar em modo editar
  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const onSubmit = (values: TaskFormValues) => {
    const payload: TaskFormValues = {
      title: values.title.trim(),
      notes: normalizeNotes(values.notes),
    };

    if (isEditMode) {
      // UI defensiva: se id existe mas task não, não tenta atualizar
      if (!taskId || !task) return;
      updateTask(taskId, payload);
      router.back();
      return;
    }

    addTask(payload);
    router.back();
  };

  // UI defensiva: modo editar com id inexistente
  if (isEditMode && !task) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Editar tarefa" }} />

        <View style={styles.notFoundCard}>
          <Text style={styles.notFoundTitle}>Tarefa não encontrada</Text>
          <Text style={styles.notFoundText}>
            Essa tarefa não existe mais ou foi removida.
          </Text>
          <Text style={styles.notFoundMeta}>ID: {String(taskId)}</Text>
        </View>

        <Pressable style={styles.btnPrimary} onPress={() => router.replace("/")}>
          <Text style={styles.btnPrimaryText}>Voltar para a Lista</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: isEditMode ? "Editar tarefa" : "Nova tarefa" }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>
            {isEditMode ? "Editar tarefa" : "Criar tarefa"}
          </Text>

          {/* TITLE */}
          <View style={styles.field}>
            <Text style={styles.label}>Título *</Text>
            <Controller
              control={control}
              name="title"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  style={[styles.input, errors.title ? styles.inputError : null]}
                  value={value ?? ""}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Ex.: Estudar React Native"
                  maxLength={60}
                  returnKeyType="done"
                />
              )}
            />
            {errors.title?.message ? (
              <Text style={styles.errorText}>{errors.title.message}</Text>
            ) : null}
          </View>

          {/* NOTES */}
          <View style={styles.field}>
            <Text style={styles.label}>Notas (opcional)</Text>
            <Controller
              control={control}
              name="notes"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  style={[
                    styles.input,
                    styles.textArea,
                    errors.notes ? styles.inputError : null,
                  ]}
                  value={value ?? ""}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Detalhes da tarefa..."
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  maxLength={200}
                />
              )}
            />
            {errors.notes?.message ? (
              <Text style={styles.errorText}>{errors.notes.message}</Text>
            ) : null}
          </View>

          <View style={styles.actions}>
            <Pressable
              style={[styles.btnPrimary, isSubmitting ? styles.btnDisabled : null]}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              <Text style={styles.btnPrimaryText}>
                {isSubmitting ? "Salvando..." : "Salvar"}
              </Text>
            </Pressable>

            <Pressable
              style={styles.btnOutline}
              onPress={() => router.back()}
              disabled={isSubmitting}
            >
              <Text style={styles.btnOutlineText}>Cancelar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    gap: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
  },

  field: { gap: 6 },
  label: {
    fontSize: 14,
    fontWeight: "800",
  },

  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  textArea: {
    minHeight: 110,
  },
  inputError: {
    borderColor: "#b91c1c",
  },
  errorText: {
    color: "#b91c1c",
    fontSize: 12,
    fontWeight: "700",
  },

  actions: {
    marginTop: 8,
    gap: 10,
  },

  btnPrimary: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  btnPrimaryText: {
    color: "#fff",
    fontWeight: "900",
  },

  btnOutline: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  btnOutlineText: {
    fontWeight: "900",
  },

  btnDisabled: {
    opacity: 0.6,
  },

  notFoundCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 8,
    marginBottom: 12,
  },
  notFoundTitle: {
    fontSize: 18,
    fontWeight: "900",
  },
  notFoundText: {
    opacity: 0.8,
  },
  notFoundMeta: {
    fontSize: 12,
    opacity: 0.7,
  },
});
