import clientsUseCases from "./lib/clients"
import merchantsUseCases from "./lib/merchants"

const queries = {
  ...clientsUseCases,
  ...merchantsUseCases,
}

export default queries
