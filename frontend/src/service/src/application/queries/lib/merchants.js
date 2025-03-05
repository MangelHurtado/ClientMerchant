import manageRequest from "@/domain/manageRequest"

const merchantsUseCases = {
  getMerchants: (signal, token) => {
    return manageRequest(
      signal,
      "getMerchants",
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
}

export default merchantsUseCases
