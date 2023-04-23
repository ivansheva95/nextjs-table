import { api } from "@/services/api"
import { TableStudentsType } from "../types/TableStudentsType"

// ----------------------------------------------------------------------

async function getAll(): Promise<TableStudentsType[]> {
  try {
    const response = await api.get<TableStudentsType[]>('/students')
    return response.data
  } catch (error) {
    console.error((error as Error).message)
    throw error
  }
}

// ----------------------------------------------------------------------

type updateDto = {
  id: number
  process: number
}

async function update({ id, process }: updateDto) {
  try {
    const response = await api.patch<TableStudentsType[]>(`/students/${id}`, { process })
    return response.data
  } catch (error) {
    console.error((error as Error).message)
    throw error
  }
}

// ----------------------------------------------------------------------

export const tableStudentsApi = {
  getAll,
  update
}
