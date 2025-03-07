import manageRequest from "@/domain/manageRequest"

const merchantsUseCases = {
  createMerchant: (signal, merchant, token) => {
    return manageRequest(
      signal,
      "createMerchant",
      merchant,
      "command",
      "normal",
      "post",
      token,
      "no-store",
      { "Content-Type": "application/json" }
    )
  },
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
      "findMerchantById",
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
      "findMerchantByName",
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
  updateMerchant: (signal, merchant, token, id) => {
    return manageRequest(
      signal,
      "updateMerchant",
      merchant,
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

export default merchantsUseCases
