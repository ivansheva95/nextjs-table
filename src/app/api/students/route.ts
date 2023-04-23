import path from 'path'
import { promises as fs } from 'fs'

export async function GET() {
  try {
    const jsonDirectory = path.join(process.cwd(), 'json');
    const fileContents = await fs.readFile(jsonDirectory + '/students.json', 'utf8');
    return new Response(fileContents, {
      status: 200
    })
  } catch (error) {
    return new Response((error as Error).message, {
      status: 500
    })
  }
}
