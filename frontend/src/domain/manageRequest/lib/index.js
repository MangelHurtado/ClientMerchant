/********************************************************************************************
 * Librería de todos los errores, queries y métodos de gestión de datos de las llamadas a API
 * *****************************************************************************************/

import { MERCHANT_METHODS } from "./methods/merchant-methods"
import {
  MERCHANT_ERROR_MESSAGES,
  MERCHANT_QUERIES,
} from "./queries/merchant-queries"

export const ERROR_MESSAGES = {
  ...MERCHANT_ERROR_MESSAGES,
}

export const QUERIES = {
  ...MERCHANT_QUERIES,
}

export const METHODS = {
  ...MERCHANT_METHODS,
}
