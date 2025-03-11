export const MERCHANT_QUERIES = {
  createMerchant: () => `${process.env.NEXT_PUBLIC_MERCHANT_API_URL}/merchant`,
  getMerchants: () => `${process.env.NEXT_PUBLIC_MERCHANT_API_URL}/merchant`,
  findById: () => `${process.env.NEXT_PUBLIC_MERCHANT_API_URL}/merchant`,
  findByName: () =>
    `${process.env.NEXT_PUBLIC_MERCHANT_API_URL}/merchant/search`,
  updateMerchant: (id) =>
    `${process.env.NEXT_PUBLIC_MERCHANT_API_URL}/merchant/${id}`,
  findByClientId: () =>
    `${process.env.NEXT_PUBLIC_MERCHANT_API_URL}/merchant/client`,
}

export const MERCHANT_ERROR_MESSAGES = {
  createMerchant: "Error creating merchant",
  getMerchants: "Error fetching merchants",
  findById: "Error fetching merchant by ID",
  findByName: "Error fetching merchant by name",
  updateMerchant: "Error updating merchant",
  findByClientId: "Error fetching merchants by client ID",
}
