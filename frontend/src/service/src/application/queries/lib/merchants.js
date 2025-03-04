import manageRequest from "@/domain/manageRequest"

const merchantsUseCases = {
  getMerchants: (signal, values, token) => {
    return manageRequest(
      signal,
      "getMerchants",
      values,
      "query",
      "normal",
      "get",
      token
    )
  },
}

export default merchantsUseCases
