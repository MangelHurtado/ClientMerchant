export const MERCHANT_QUERIES = {
  createMerchant: () => `${process.env.NEXT_PUBLIC_API_URL}/merchant`,
  getMerchants: () => `${process.env.NEXT_PUBLIC_API_URL}/merchant`,
  findById: (id) => `${process.env.NEXT_PUBLIC_API_URL}/merchant/${id}`,
  findByName: (name) =>
    `${process.env.NEXT_PUBLIC_API_URL}/merchant/search?name=${name}`,
  updateMerchant: (id) => `${process.env.NEXT_PUBLIC_API_URL}/merchant/${id}`,
}

export const MERCHANT_ERROR_MESSAGES = {
  createMerchant: "Error al crear merchant",
  getMerchants: "Error al obtener merchants",
  findById: "Error al obtener el merchant por ID",
  findByName: "Error al obtener el merchant por nombre",
  updateMerchant: "Error al actualizar merchant",
}
