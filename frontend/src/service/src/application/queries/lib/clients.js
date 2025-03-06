import manageRequest from "@/domain/manageRequest"

const clientsUseCases = {
  createClient: (signal, client, token) => {
    return manageRequest(
      signal,
      "createClient",
      client,
      "command",
      "normal",
      "post",
      token,
      "no-store",
      { "Content-Type": "application/json" }
    )
  },
  getClients: (signal, token) => {
    return manageRequest(
      signal,
      "getClients",
      {},
      "query",
      "normal",
      "get",
      token
    )
  },
  findById: (signal, id, token) => {
    return manageRequest(
      signal,
      "findById",
      {},
      "query",
      "normal",
      "get",
      token,
      "no-store",
      {},
      true,
      id
    )
  },
  findByName: (signal, name, token) => {
    return manageRequest(
      signal,
      "findByName",
      {},
      "query",
      "normal",
      "get",
      token,
      "no-store",
      {},
      true,
      String(name)
    )
  },
  findByEmail: (signal, email, token) => {
    return manageRequest(
      signal,
      "findByEmail",
      {},
      "query",
      "normal",
      "get",
      token,
      "no-store",
      {},
      true,
      String(email)
    )
  },
  updateClient: (signal, client, token, id) => {
    return manageRequest(
      signal,
      "updateClient",
      client,
      "command",
      "normal",
      "put",
      token,
      "no-store",
      { "Content-Type": "application/json" },
      true,
      id
    )
  },
}

export default clientsUseCases
