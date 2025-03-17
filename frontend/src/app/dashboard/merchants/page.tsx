import MerchantDelivery from "@/common/components/MerchantComponent/Delivery"
import { Merchant } from "@/common/components/MerchantComponent/Delivery/interface"
import Service from "@/service/src"

export default async function MerchantsPage({
  searchParams,
}: {
  searchParams: any
}) {
  let merchants: Merchant[] = []

  try {
    const { page, ...searchCriteria } = searchParams
    const searchParam = Object.entries(searchCriteria)[0]

    if (searchParam) {
      const [searchType, searchValue] = searchParam
      switch (searchType) {
        case "name":
          merchants = (await Service.useCases("findMerchantByName", {
            signal: undefined,
            endPointData: searchValue,
            token: undefined,
          })) as Merchant[]
          break
        case "id": {
          const merchant = (await Service.useCases("findMerchantById", {
            signal: undefined,
            endPointData: searchValue,
            token: undefined,
          })) as Merchant
          merchants = merchant ? [merchant] : []
          break
        }
        case "clientId":
          merchants = (await Service.useCases("findMerchantByClientId", {
            signal: undefined,
            endPointData: searchValue,
            token: undefined,
          })) as Merchant[]
          break
      }
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
