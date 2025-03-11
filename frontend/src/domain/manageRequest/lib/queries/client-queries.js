export const CLIENT_QUERIES = {
  createClient: () => `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/client`,
  getClients: () => `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/client`,
  findById: () => `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/client`,
  findByName: () =>
    `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/client/search/by-name`,
  findByEmail: () =>
    `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/client/search/by-email`,
  updateClient: (id) =>
    `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/client/${id}`,
}

export const CLIENT_ERROR_MESSAGES = {
  createClient: "Error creating client",
  getClients: "Error fetching clients",
  findById: "Error fetching client by ID",
  findByName: "Error fetching client by name",
  findByEmail: "Error fetching client by email",
  updateClient: "Error updating client",
}
