export function extractErrorMessage(value: unknown): string {
  return value instanceof Error ? value.message : String(value)
}
