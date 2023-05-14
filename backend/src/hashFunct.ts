export const stringHash = (str: string) => {
  const act = str.toLowerCase();
  let i: number;
  let chr: number;
  let hash: number = 0;
  for (i = 0; i < act.length; i++) {
    chr = act.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  if (hash < 0) {
    hash = hash * -1;
  }
  return hash;
}
