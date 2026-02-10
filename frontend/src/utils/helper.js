export const daysOnApp = (createdAt) => {
  const today = new Date();
  const diffTime = today - createdAt;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}