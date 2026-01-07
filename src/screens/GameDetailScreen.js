import React, { useState } from "react";
import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import { addJournalEntry } from "../storage/journalStorage";

export default function GameDetailScreen({ route, navigation }) {
  const { game } = route.params;
  const [saving, setSaving] = useState(false);

  async function handleAdd() {
    try {
      setSaving(true);
      await addJournalEntry(game);
      // Volvemos al Journal para que lo veas
      navigation.navigate("Journal");
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 20, gap: 12 }}>
      {game.background_image ? (
        <Image
          source={{ uri: game.background_image }}
          style={{ width: "100%", height: 200, borderRadius: 12 }}
        />
      ) : null}

      <Text style={{ fontSize: 26, fontWeight: "800" }}>{game.name}</Text>

      <Text style={{ opacity: 0.7 }}>Release date: {game.released || "—"}</Text>
      <Text style={{ opacity: 0.7 }}>
        Rating: {game.rating ? game.rating.toFixed(1) : "—"}
      </Text>

      <Pressable
        onPress={handleAdd}
        disabled={saving}
        style={{
          marginTop: 20,
          paddingVertical: 14,
          borderRadius: 12,
          backgroundColor: "#111827",
          opacity: saving ? 0.7 : 1,
        }}
      >
        {saving ? (
          <ActivityIndicator />
        ) : (
          <Text style={{ color: "white", textAlign: "center", fontWeight: "700" }}>
            Add to Journal
          </Text>
        )}
      </Pressable>
    </View>
  );
}
