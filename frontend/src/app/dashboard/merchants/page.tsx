"use client"

import { Table } from "antd"
import useCases from "@/service/src/application"
import { Merchant } from "@/common/types/merchant"
import { CSSProperties, useEffect, useState, useCallback } from "react"
import { SearchClientComponent } from "@/common/components/ClientComponent/Delivery"

const MerchantsPage = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchAllMerchants = useCallback(async () => {
    try {
      const data = await useCases.getMerchants()
      setMerchants(data)
    } catch (error) {
      console.error("Error fetching merchants:", error)
    }
  }, [])

  useEffect(() => {
    fetchAllMerchants()
  }, [fetchAllMerchants])

  const handleSearch = useCallback(
    async (type: "id" | "name", value: string) => {
      setIsLoading(true)
      try {
        if (!value.trim()) {
          await fetchAllMerchants()
        } else {
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
    [fetchAllMerchants]
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
      <SearchClientComponent onSearch={handleSearch} />
      <Table
        className="w-full"
        dataSource={merchants}
        columns={columns}
        rowKey="id"
        pagination={{ position: ["bottomCenter"], style: paginationStyle }}
        loading={isLoading}
      />
    </div>
  )
}

export default MerchantsPage
