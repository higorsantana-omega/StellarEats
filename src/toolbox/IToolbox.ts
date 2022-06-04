interface UUID {
  generateUUID(): string
}

interface Encryption {
  encrypt(data: string): string
}

export default interface ToolBox extends UUID, Encryption {}
