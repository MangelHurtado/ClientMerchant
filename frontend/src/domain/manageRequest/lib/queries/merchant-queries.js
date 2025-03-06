export const MERCHANT_QUERIES = {
  createMerchant: () => `${process.env.NEXT_PUBLIC_MERCHANT_API_URL}/merchant`,
  getMerchants: () => `${process.env.NEXT_PUBLIC_MERCHANT_API_URL}/merchant`,
  findById: (id) =>
    `${process.env.NEXT_PUBLIC_MERCHANT_API_URL}/merchant/${id}`,
  findByName: (name) =>
    `${process.env.NEXT_PUBLIC_MERCHANT_API_URL}/merchant/search?name=${name}`,
  updateMerchant: (id) =>
    `${process.env.NEXT_PUBLIC_MERCHANT_API_URL}/merchant/${id}`,
}

export const MERCHANT_ERROR_MESSAGES = {
  createMerchant: "Error creating merchant",
  getMerchants: "Error fetching merchants",
  findById: "Error fetching merchant by ID",
  findByName: "Error fetching merchant by name",
  updateMerchant: "Error updating merchant",
}
