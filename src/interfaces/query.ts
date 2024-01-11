export interface IQuery {
  input: string
  chat_history: string[]
  output: string
  intermediate_steps: [
    [
      {
        tool: string
        tool_input: string
        log: string
      },
      'I have access to a wide range of documents, including articles, research papers, books, legal documents, historical records, and more. Is there a specific type of document you are interested in?',
    ],
  ]
}
