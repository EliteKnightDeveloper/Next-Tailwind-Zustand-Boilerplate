export interface IIntegration {
  id: number
  name: string
  description: string
  args_schema: string
  env_vars: unknown[]
  image: string
  modules: unknown[]
  code: string
}
