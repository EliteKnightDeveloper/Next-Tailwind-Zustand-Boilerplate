import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const packageJsonPath = path.resolve(process.cwd(), 'package.json')
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8')
  const packageJson = JSON.parse(packageJsonContent)
  const projectVersion = packageJson.version
  res.status(200).json({ version: projectVersion })
}
