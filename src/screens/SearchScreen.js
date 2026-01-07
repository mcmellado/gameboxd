import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { RAWG_API_KEY } from "../config";
import { useNavigation } from "@react-navigation/native";

export default function SearchScreen() {
  const navigation = useNavigation(); // ✅ AÑADIR ESTO

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Ready.");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  async function runSearch() {
    const q = query.trim();

    if (!q) {
      setResults([]);
      setStatus("Type something (e.g., GTA) then tap Search.");
      return;
    }

    if (!RAWG_API_KEY || RAWG_API_KEY.length < 10) {
      setStatus("❌ API key missing/invalid. Check src/config.js");
      return;
    }

    try {
      setLoading(true);
      setStatus(`Searching for "${q}"...`);

      const url =
        `https://api.rawg.io/api/games?` +
        `key=${encodeURIComponent(RAWG_API_KEY)}` +
        `&search=${encodeURIComponent(q)}` +
        `&page_size=20`;

      const res = await fetch(url);

      if (!res.ok) {
        const txt = await res.text();
        setResults([]);
        setStatus(`❌ API error ${res.status}: ${txt.slice(0, 140)}`);
        return;
      }

      const data = await res.json();
      const list = Array.isArray(data?.results) ? data.results : [];

      setResults(list);
      setStatus(list.length ? `✅ Found ${list.length} results` : "No results found.");
    } catch (e) {
      setResults([]);
      setStatus(`❌ Network error: ${String(e?.message || e)}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "800" }}>Search</Text>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Try: GTA, Zelda, Stardew..."
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.15)",
          borderRadius: 12,
          padding: 12,
        }}
      />

      <Pressable
        onPress={runSearch}
        style={{
          paddingVertical: 12,
          borderRadius: 12,
          backgroundColor: "#111827",
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "700" }}>
          Search
        </Text>
      </Pressable>

      {loading ? <ActivityIndicator /> : null}
      <Text style={{ opacity: 0.8 }}>{status}</Text>

      <FlatList
        data={results}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("GameDetail", { game: item })} // NAVEGAR
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
          </Pressable>
        )}
      />
    </View>
  );
}
