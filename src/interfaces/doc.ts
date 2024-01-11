export interface IDoc {
  id: number
  filename: string
  type: string
  owner: string
  summary: string
  index_name: string
  keys: unknown[]
}
