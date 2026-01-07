import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "journal_entries_v1";

export async function getJournalEntries() {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function addJournalEntry(game) {
  const entries = await getJournalEntries();

  // Evitar duplicados
  if (entries.some((e) => e.id === game.id)) return entries;

  const next = [
    {
      id: game.id,
      name: game.name,
      released: game.released || null,
      background_image: game.background_image || null,
      addedAt: new Date().toISOString(),
    },
    ...entries,
  ];

  await AsyncStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
