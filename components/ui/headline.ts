export function headlineGroups(headline: string) {
  const words = headline.split(" ");
  const size = Math.ceil(words.length / 3);

  return [words.slice(0, size), words.slice(size, size * 2), words.slice(size * 2)]
    .filter((group) => group.length > 0)
    .map((group) => group.join(" "));
}
