import ClientDelivery from "@/common/components/ClientComponent/Delivery"
import { Client } from "@/common/components/ClientComponent/Delivery/interface"
import Service from "@/service/src"
import { cookies } from "next/headers"

interface ClientSearchParams {
  name?: string
  id?: string
  email?: string
  page?: string
}

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: ClientSearchParams
}) {
  let clients: Client[] = []
  const cookieStore = cookies()
  const token = cookieStore.get("auth_token")?.value

  try {
    const { name, id, email, page } = searchParams

    if (name) {
      clients = (await Service.useCases("findClientByName", {
        signal: undefined,
        endPointData: name,
        token,
      })) as Client[]
    } else if (id) {
      const client = (await Service.useCases("findClientById", {
        signal: undefined,
        endPointData: id,
        token,
      })) as Client
      clients = client ? [client] : []
    } else if (email) {
      const client = (await Service.useCases("findClientByEmail", {
        signal: undefined,
        endPointData: email,
        token,
      })) as Client
      clients = client ? [client] : []
    } else {
      clients = (await Service.useCases("getClients", {
        signal: undefined,
        endPointData: null,
        token,
      })) as Client[]
    }
  } catch (error) {
    console.error("Error fetching clients:", error)
    clients = []
  }

  return <ClientDelivery searchParams={searchParams} data={clients} />
}
