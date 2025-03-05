"use client"

import { Table } from "antd"
import useCases from "@/service/src/application"
import { Merchant } from "@/common/types/merchant"
import { CSSProperties, useEffect, useState, useCallback } from "react"
import { SearchClientComponent } from "@/common/components/ClientComponent/Delivery"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

const WAIT_BETWEEN_CHANGE = 300

const MerchantsPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchAllMerchants = useCallback(async () => {
    try {
      const data = await useCases.getMerchants()
      setMerchants(data)
    } catch (error) {
      console.error("Error fetching merchants:", error)
    }
  }, [])

  useEffect(() => {
    const type = (searchParams.get("type") as "id" | "name") || "name"
    const value = searchParams.get("value") || ""
    const page = parseInt(searchParams.get("page") || "1", 10)
    setCurrentPage(page)

    if (value) {
      handleSearch(type, value, page.toString())
    } else if (!value) {
      fetchAllMerchants()
    }
  }, [fetchAllMerchants, searchParams])

  const handleSearch = useDebouncedCallback(
    async (type: "id" | "name", value: string, pageParam?: string) => {
      setIsLoading(true)
      try {
        if (!value.trim()) {
          await fetchAllMerchants()
          const params = new URLSearchParams()
          const currentPage = searchParams.get("page")
          if (currentPage) {
            params.set("page", currentPage)
          }
          router.replace(`/dashboard/merchants?${params.toString()}`)
        } else {
          const params = new URLSearchParams()
          params.set("type", type)
          params.set("value", value)
          params.set("page", pageParam || "1")
          router.replace(`/dashboard/merchants?${params.toString()}`)

          if (type === "id") {
            const result = await useCases.findById(null, value)
            setMerchants(result ? [result] : [])
          } else {
            const result = await useCases.findByName(null, value)
            setMerchants(
              Array.isArray(result) && result.length > 0 ? result : []
            )
          }
        }
      } catch (error) {
        console.error("Error during search:", error)
        setMerchants([])
      } finally {
        setIsLoading(false)
      }
    },
    WAIT_BETWEEN_CHANGE,
    { maxWait: WAIT_BETWEEN_CHANGE * 2 }
  )

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Type", dataIndex: "merchantType", key: "merchantType" },
  ]

  const paginationStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
  }

  return (
    <div className="h-full w-full p-4">
      <SearchClientComponent
        onSearch={handleSearch}
        initialType={(searchParams.get("type") as "id" | "name") || "name"}
        initialValue={searchParams.get("value") || ""}
      />
      <Table
        className="w-full"
        dataSource={merchants}
        columns={columns}
        rowKey="id"
        pagination={{
          position: ["bottomCenter"],
          pageSize: 5,
          current: currentPage,
          style: paginationStyle,
          onChange: (page) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set("page", page.toString())
            router.replace(`/dashboard/merchants?${params.toString()}`)
          },
        }}
        loading={isLoading}
      />
    </div>
  )
}

export default MerchantsPage
