import { Client } from "@/common/components/ClientComponent/Delivery/interface"
import useCases from "@/service/src/application"

export async function searchClients(
  searchParams: { [key: string]: string | string[] | undefined } = {},
  token: string | null
) {
  try {
    if (searchParams.id) {
      const client = await useCases.findClientById(
        null,
        searchParams.id as string,
        token
      )
      return client ? [client] : []
    }

    if (searchParams.name) {
      return await useCases.findClientByName(
        null,
        searchParams.name as string,
        token
      )
    }

    if (searchParams.email) {
      const client = await useCases.findClientByEmail(
        null,
        searchParams.email as string,
        token
      )
      return client ? [client] : []
    }

    return await useCases.getClients(null, token)
  } catch (error) {
    console.error("Error searching clients:", error)
    return []
  }
}

export async function createClientAction(client: Client, token: string | null) {
  try {
    await useCases.createClient(null, client, token)
    return { success: true }
  } catch (error) {
    console.error("Error creating client:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create client",
    }
  }
}

export async function updateClientAction(
  client: Client,
  id: string,
  token: string | null
) {
  try {
    await useCases.updateClient(null, client, token, id)
    return { success: true }
  } catch (error) {
    console.error("Error updating client:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update client",
    }
  }
}
