import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página não encontrada</Text>
      <Link href="/" style={styles.link}>Voltar para Home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, gap: 12 },
  title: { fontSize: 20, fontWeight: "700" },
  link: { fontSize: 16, color: "#2563eb", fontWeight: "600" },
});
