import React, { useCallback, useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getJournalEntries } from "../storage/journalStorage";

export default function JournalScreen() {
  const navigation = useNavigation();
  const [entries, setEntries] = useState([]);

  const load = useCallback(async () => {
    const data = await getJournalEntries();
    setEntries(data);
  }, []);

  // Se refresca cada vez que vuelves a esta pantalla
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  return (
    <View style={{ flex: 1, padding: 20, gap: 14 }}>
      <Text style={{ fontSize: 28, fontWeight: "800" }}>Your Journal</Text>
      <Text style={{ opacity: 0.7, lineHeight: 20 }}>
        Track what you’re playing, rate games, and keep short notes.
      </Text>

      <Pressable
        style={{
          marginTop: 10,
          paddingVertical: 14,
          paddingHorizontal: 16,
          borderRadius: 12,
          backgroundColor: "#111827",
        }}
        onPress={() => navigation.navigate("Search")}
      >
        <Text style={{ color: "white", fontWeight: "700", textAlign: "center" }}>
          Add a game
        </Text>
      </Pressable>

      <FlatList
        data={entries}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 12,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.12)",
            }}
          >
            <Text style={{ fontWeight: "800" }}>{item.name}</Text>
            <Text style={{ opacity: 0.7, marginTop: 4 }}>
              {item.released ? `Released: ${item.released}` : "Release date: —"}
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              marginTop: 18,
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.12)",
            }}
          >
            <Text style={{ fontWeight: "700" }}>No games yet</Text>
            <Text style={{ opacity: 0.7, marginTop: 6 }}>
              Tap “Add a game” to start building your list.
            </Text>
          </View>
        )}
      />
    </View>
  );
}
