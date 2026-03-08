declare module 'pg' {
  export class Pool {
    constructor(config?: unknown)
    query(text: string, values?: unknown[]): Promise<{
      rowCount?: number
      rows: Array<{ id: string }>
    }>
  }
}
