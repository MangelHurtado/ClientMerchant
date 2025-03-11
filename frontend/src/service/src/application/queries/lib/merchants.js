import manageRequest from "@/domain/manageRequest"

const merchantsUseCases = {
  createMerchant: (signal, merchant, token) => {
    return manageRequest(
      signal,
      "createMerchant",
      merchant,
      undefined,
      undefined,
      "post",
      token,
      undefined,
      { "Content-Type": "application/json" }
    )
  },
  getMerchants: (signal, token) => {
    return manageRequest(
      signal,
      "getMerchants",
      {},
      "query",
      undefined,
      undefined,
      token
    )
  },
  findMerchantById: (signal, id, token) => {
    return manageRequest(
      signal,
      "findMerchantById",
      { id },
      "url",
      undefined,
      undefined,
      token
    )
  },
  findMerchantByName: (signal, name, token) => {
    return manageRequest(
      signal,
      "findMerchantByName",
      { name },
      "query",
      undefined,
      undefined,
      token
    )
  },
  updateMerchant: (signal, merchant, token, id) => {
    return manageRequest(
      signal,
      "updateMerchant",
      merchant,
      undefined,
      undefined,
      "put",
      token,
      undefined,
      { "Content-Type": "application/json" },
      undefined,
      id
    )
  },
  findMerchantByClientId: (signal, clientId, token) => {
    return manageRequest(
      signal,
      "findMerchantByClientId",
      { clientId },
      "url",
      undefined,
      undefined,
      token
    )
  },
}

export default merchantsUseCases
