/* import exampleUseCases from "./lib/example"

const queries = {
  ...exampleUseCases,
}

export default queries
 */

import exampleUseCases from "./lib/example"
import merchantsUseCases from "./lib/merchants"

const queries = {
  ...exampleUseCases,
  ...merchantsUseCases,
}

export default queries
