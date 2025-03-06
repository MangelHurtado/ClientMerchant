export const CLIENT_QUERIES = {
  createClient: () => `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/client`,
  getClients: () => `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/client`,
  findById: (id) => `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/client/${id}`,
  findByName: (name) =>
    `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/client/search/by-name?name=${name}`,
  findByEmail: (email) =>
    `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/client/search/by-email?email=${email}`,
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
