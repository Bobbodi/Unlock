const STORAGE_KEY = "weshare_thoughts_v1";

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeAll(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// tab = "all" | "friends"
export async function listThoughts(tab) {
  const all = readAll();

  return all
    .filter((t) => t.visibility === tab)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createThought({ content, visibility }) {
  const all = readAll();

  const newThought = {
    id: crypto.randomUUID(),
    authorName: "You", // later you can replace with username
    content,
    visibility, // "all" or "friends"
    createdAt: new Date().toISOString(),
  };

  const updated = [newThought, ...all];
  writeAll(updated);

  return newThought;
}
