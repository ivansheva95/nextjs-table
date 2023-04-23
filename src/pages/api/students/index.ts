import path from 'path'
import { promises as fs } from 'fs'
import { 
  NextApiRequest, 
  NextApiResponse 
} from 'next';

export default async function handler(
  request: NextApiRequest, 
  response: NextApiResponse
  ) {
  switch (request.method) {
    // GET
    default: {
      try {
        const jsonDirectory = path.join(process.cwd(), 'json');
        const fileContents = await fs.readFile(jsonDirectory + '/students.json', 'utf8');
        response.status(200).send(fileContents)
      } catch (error) {
        response.status(500).send((error as Error).message)
      }
    }
  }
}
