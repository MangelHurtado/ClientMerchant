import { cookies } from "next/headers"

import { Client } from "@/common/components/ClientComponent/Delivery/interface"
import ClientDelivery from "@/common/components/ClientComponent/Delivery"
import Service from "@/service/src"

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

    clients = name
      ? ((await Service.useCases("findClientByName", {
          signal: undefined,
          endPointData: name,
          token,
        })) as Client[])
      : id
      ? await (async () => {
          const client = (await Service.useCases("findClientById", {
            signal: undefined,
            endPointData: id,
            token,
          })) as Client
          return client ? [client] : []
        })()
      : email
      ? await (async () => {
          const client = (await Service.useCases("findClientByEmail", {
            signal: undefined,
            endPointData: email,
            token,
          })) as Client
          return client ? [client] : []
        })()
      : ((await Service.useCases("getClients", {
          signal: undefined,
          endPointData: null,
          token,
        })) as Client[])
  } catch (error) {
    console.error("Error fetching clients:", error)
    clients = []
  }

  return <ClientDelivery searchParams={searchParams} data={clients} />
}
