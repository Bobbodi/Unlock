const KEY = "weshare_qotd_comments_v1";

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function writeAll(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

// Load comments (newest first)
export async function listQotdComments() {
  const all = readAll();
  return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

// Create a comment
export async function createQotdComment({ text }) {
  const all = readAll();
  const newComment = {
    id: crypto.randomUUID(),
    author: "You",
    text,
    createdAt: new Date().toISOString(),
  };

  const updated = [newComment, ...all];
  writeAll(updated);
  return newComment;
}
