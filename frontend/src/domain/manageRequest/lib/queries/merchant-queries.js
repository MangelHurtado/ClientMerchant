export const MERCHANT_QUERIES = {
  createMerchant: () => `${process.env.NEXT_PUBLIC_MERCHANT_API_URL}/merchant`,
  getMerchants: () => `${process.env.NEXT_PUBLIC_MERCHANT_API_URL}/merchant`,
  findMerchantById: () =>
    `${process.env.NEXT_PUBLIC_MERCHANT_API_URL}/merchant`,
  findMerchantByName: () =>
    `${process.env.NEXT_PUBLIC_MERCHANT_API_URL}/merchant/search`,
  updateMerchant: (id) =>
    `${process.env.NEXT_PUBLIC_MERCHANT_API_URL}/merchant/${id}`,
  findMerchantByClientId: () =>
    `${process.env.NEXT_PUBLIC_MERCHANT_API_URL}/merchant/client`,
}

export const MERCHANT_ERROR_MESSAGES = {
  createMerchant: "Error creating merchant",
  getMerchants: "Error fetching merchants",
  findMerchantById: "Error fetching merchant by ID",
  findMerchantByName: "Error fetching merchant by name",
  updateMerchant: "Error updating merchant",
  findMerchantByClientId: "Error fetching merchants by client ID",
}
