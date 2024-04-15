export interface IIntegration {
  id: string
  name: string
  description: string
  args_schema: string
  env_vars: unknown[]
  image: string
  modules: unknown[]
  code: string
}
