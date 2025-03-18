import { Client } from "@/common/components/ClientComponent/Delivery/interface"
import useCases from "@/service/src/application"

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
