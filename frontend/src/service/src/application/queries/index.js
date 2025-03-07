import clientsUseCases from "./lib/clients"
import merchantsUseCases from "./lib/merchants"

const queries = {
  clients: clientsUseCases,
  merchants: merchantsUseCases,
}

export default queries
