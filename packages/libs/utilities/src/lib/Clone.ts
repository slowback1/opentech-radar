export function Clone<T>(input: T): T {
  return JSON.parse(JSON.stringify(input));
}
