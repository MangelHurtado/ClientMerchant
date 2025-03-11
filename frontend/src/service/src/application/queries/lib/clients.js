import manageRequest from "@/domain/manageRequest"

const clientsUseCases = {
  createClient: (signal, client, token) => {
    return manageRequest(
      signal,
      "createClient",
      client,
      "command",
      undefined,
      "post",
      token,
      undefined,
      { "Content-Type": "application/json" }
    )
  },
  getClients: (signal, token) => {
    return manageRequest(
      signal,
      "getClients",
      {},
      "query",
      undefined,
      undefined,
      token
    )
  },
  findClientById: (signal, id, token) => {
    return manageRequest(
      signal,
      "findClientById",
      { id },
      "url",
      undefined,
      undefined,
      token
    )
  },
  findClientByName: (signal, name, token) => {
    return manageRequest(
      signal,
      "findClientByName",
      { name },
      "query",
      undefined,
      undefined,
      token
    )
  },
  findClientByEmail: (signal, email, token) => {
    return manageRequest(
      signal,
      "findClientByEmail",
      { email },
      "query",
      undefined,
      undefined,
      token
    )
  },
  updateClient: (signal, client, token, id) => {
    return manageRequest(
      signal,
      "updateClient",
      client,
      "command",
      undefined,
      "put",
      token,
      undefined,
      { "Content-Type": "application/json" },
      undefined,
      id
    )
  },
}

export default clientsUseCases
