import { Merchant } from "@/common/components/MerchantComponent/Delivery/interface"
import MerchantDelivery from "@/common/components/MerchantComponent/Delivery"
import Service from "@/service/src"

interface MerchantSearchParams {
  name?: string
  id?: string
  clientId?: string
  page?: string
}

export default async function MerchantsPage({
  searchParams,
}: {
  searchParams: MerchantSearchParams
}) {
  let merchants: Merchant[] = []

  try {
    const { name, id, clientId, page } = searchParams

    if (name) {
      merchants = (await Service.useCases("findMerchantByName", {
        signal: undefined,
        endPointData: name,
        token: undefined,
      })) as Merchant[]
    } else if (id) {
      const merchant = (await Service.useCases("findMerchantById", {
        signal: undefined,
        endPointData: id,
        token: undefined,
      })) as Merchant
      merchants = merchant ? [merchant] : []
    } else if (clientId) {
      merchants = (await Service.useCases("findMerchantByClientId", {
        signal: undefined,
        endPointData: clientId,
        token: undefined,
      })) as Merchant[]
    } else {
      merchants = (await Service.useCases("getMerchants", {
        signal: undefined,
        endPointData: null,
        token: undefined,
      })) as Merchant[]
    }
  } catch (error) {
    console.error("Error fetching merchants:", error)
    merchants = []
  }

  return <MerchantDelivery searchParams={searchParams} data={merchants} />
}
