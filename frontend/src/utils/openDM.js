// function to create/open chat with other user
async function dmChannelId(myId, otherId) {
  const [a, b] = [myId, otherId].sort();
  const input = `dm:${a}:${b}`;

  const enc = new TextEncoder().encode(input);
  const hashBuf = await crypto.subtle.digest("SHA-256", enc);
  const hashArr = Array.from(new Uint8Array(hashBuf));
  const hex = hashArr.map((x) => x.toString(16).padStart(2, "0")).join("");

  // 32 chars is enough; total length = 3 + 32 = 35
  return `dm_${hex.slice(0, 32)}`;
}

export async function openDM(streamClient, otherUserId) {
  if (!streamClient || !otherUserId) return null;

  const myId = streamClient.userID;

  if (otherUserId === myId) return null;

  const channelId = await dmChannelId(myId, otherUserId);

  const dm = streamClient.channel("messaging", channelId, {
    members: [myId, otherUserId],
  });

  await dm.watch();
  return dm;
}
