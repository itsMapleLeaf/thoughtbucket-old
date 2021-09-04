export function extractErrorMessage(value: unknown): string {
  return value instanceof Error ? value.message : String(value)
}

export function raise(message: string): never {
  throw new Error(message)
}
