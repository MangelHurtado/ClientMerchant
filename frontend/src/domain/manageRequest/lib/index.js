/********************************************************************************************
 * Librería de todos los errores, queries y métodos de gestión de datos de las llamadas a API
 * *****************************************************************************************/

import { CLIENT_METHODS } from "./methods/client-methods"
import { MERCHANT_METHODS } from "./methods/merchant-methods"

import { CLIENT_ERROR_MESSAGES, CLIENT_QUERIES } from "./queries/client-queries"
import {
  MERCHANT_ERROR_MESSAGES,
  MERCHANT_QUERIES,
} from "./queries/merchant-queries"

export const ERROR_MESSAGES = {
  ...CLIENT_ERROR_MESSAGES,
  ...MERCHANT_ERROR_MESSAGES,
}

export const QUERIES = {
  // Client queries
  createClient: CLIENT_QUERIES.createClient,
  getClients: CLIENT_QUERIES.getClients,
  findClientById: CLIENT_QUERIES.findById,
  findClientByName: CLIENT_QUERIES.findByName,
  findClientByEmail: CLIENT_QUERIES.findByEmail,
  updateClient: CLIENT_QUERIES.updateClient,
  // Merchant queries
  createMerchant: MERCHANT_QUERIES.createMerchant,
  getMerchants: MERCHANT_QUERIES.getMerchants,
  findMerchantById: MERCHANT_QUERIES.findById,
  findMerchantByName: MERCHANT_QUERIES.findByName,
  updateMerchant: MERCHANT_QUERIES.updateMerchant,
  findByClientId: MERCHANT_QUERIES.findByClientId,
}

export const METHODS = {
  // Client methods
  createClient: CLIENT_METHODS.createClient,
  getClients: CLIENT_METHODS.getClients,
  findClientById: CLIENT_METHODS.findById,
  findClientByName: CLIENT_METHODS.findByName,
  findClientByEmail: CLIENT_METHODS.findByEmail,
  updateClient: CLIENT_METHODS.updateClient,
  // Merchant methods
  createMerchant: MERCHANT_METHODS.createMerchant,
  getMerchants: MERCHANT_METHODS.getMerchants,
  findMerchantById: MERCHANT_METHODS.findById,
  findMerchantByName: MERCHANT_METHODS.findByName,
  updateMerchant: MERCHANT_METHODS.updateMerchant,
  findByClientId: MERCHANT_METHODS.findByClientId,
}
