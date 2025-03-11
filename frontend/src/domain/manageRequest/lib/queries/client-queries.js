export const CLIENT_QUERIES = {
  createClient: () => `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/client`,
  getClients: () => `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/client`,
  findClientById: () => `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/client`,
  findClientByName: () =>
    `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/client/search/by-name`,
  findClientByEmail: () =>
    `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/client/search/by-email`,
  updateClient: (id) =>
    `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/client/${id}`,
}

export const CLIENT_ERROR_MESSAGES = {
  createClient: "Error creating client",
  getClients: "Error fetching clients",
  findClientById: "Error fetching client by ID",
  findClientByName: "Error fetching client by name",
  findClientByEmail: "Error fetching client by email",
  updateClient: "Error updating client",
}
