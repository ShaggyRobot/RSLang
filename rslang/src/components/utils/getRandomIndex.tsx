export function getRandomIndex(index: number, max: number): number {
  const start = index <= 0 ? 0 : index - 1;
  const end = index >= max - 1 ? 0 : index + 1;
  return Math.floor(Math.random() * (end - start + 1)) + start;
}
