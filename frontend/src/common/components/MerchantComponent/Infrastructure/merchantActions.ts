import { Merchant } from "@/common/components/MerchantComponent/Delivery/interface"
import useCases from "@/service/src/application"

export async function createMerchantAction(merchant: Merchant) {
  try {
    await useCases.createMerchant(null, merchant)
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
    await useCases.updateMerchant(null, merchant, undefined, id)
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}
