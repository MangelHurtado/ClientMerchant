export const MERCHANT_QUERIES = {
  getMerchants: () => `${process.env.NEXT_PUBLIC_API_URL}/merchant`,
  findById: (id) => `${process.env.NEXT_PUBLIC_API_URL}/merchant/${id}`,
  findByName: (name) =>
    `${process.env.NEXT_PUBLIC_API_URL}/merchant/search?name=${name}`,
}

export const MERCHANT_ERROR_MESSAGES = {
  getMerchants: "Error al obtener merchants",
  findById: "Error al obtener el merchant por ID",
  findByName: "Error al obtener el merchant por nombre",
}
