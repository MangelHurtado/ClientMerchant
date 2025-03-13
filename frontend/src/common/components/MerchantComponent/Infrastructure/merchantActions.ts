import { Merchant } from "@/common/components/MerchantComponent/Delivery/interface"
import useCases from "@/service/src/application"

export async function createMerchantAction(merchant: Merchant) {
  try {
    await useCases.merchants.createMerchant(null, merchant)
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}

export async function updateMerchantAction(merchant: Merchant, id: string) {
  try {
    await useCases.merchants.updateMerchant(null, merchant, undefined, id)
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}

export async function searchMerchants(searchParams: {
  [key: string]: string | string[] | undefined
}) {
  try {
    // Check which search param is present
    const searchType = ["id", "name", "clientId"].find(
      (type) => searchParams[type]
    )

    if (!searchType) {
      return await useCases.merchants.getMerchants()
    }

    const value = searchParams[searchType] as string

    switch (searchType) {
      case "id":
        const merchantById = await useCases.merchants.findMerchantById(
          null,
          value
        )
        return merchantById ? [merchantById] : []
      case "clientId":
        return await useCases.merchants.findMerchantByClientId(null, value)
      case "name":
        return await useCases.merchants.findMerchantByName(null, value)
      default:
        return await useCases.merchants.getMerchants()
    }
  } catch (error) {
    console.error("Error searching merchants:", error)
    return []
  }
}
