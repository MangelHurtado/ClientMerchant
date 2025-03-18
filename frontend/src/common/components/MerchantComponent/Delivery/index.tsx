"use client"

import { useDebouncedCallback } from "use-debounce"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Merchant } from "@/common/components/MerchantComponent/Delivery/interface"
import { useThemedNotification } from "@/common/hooks/useThemedNotification"
import CommonTable from "@/common/components/TableComponent"
import FormComponent from "@/common/components/FormComponent"
import SearchComponent from "@/common/components/SearchComponent"
import {
  createMerchantAction,
  updateMerchantAction,
} from "../Infrastructure/merchantActions"

import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"

const WAIT_BETWEEN_CHANGE = 300

type SearchType = "name" | "id" | "clientId"

interface MerchantDeliveryProps {
  searchParams?: {
    name?: string
    id?: string
    clientId?: string
    page?: string
  }
  data: Merchant[]
}

export default function MerchantDelivery({
  searchParams,
  data: data,
}: MerchantDeliveryProps) {
  const router = useRouter()
  const { notifySuccess, notifyError } = useThemedNotification()

  // Extract searchParams values
  const pageParam = searchParams?.page
  const searchTypes: SearchType[] = ["name", "id", "clientId"]
  const currentSearchType = (searchTypes.find((type) => searchParams?.[type]) ||
    "name") as SearchType
  const currentSearchValue = searchParams?.[currentSearchType] || ""

  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(parseInt(pageParam || "1", 10))
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedMerchant, setSelectedMerchant] = useState<
    Merchant | undefined
  >(undefined)

  useEffect(() => {
    setMerchants(data)
  }, [data])

  //Update URL params
  const updateUrlParams = (params: URLSearchParams) => {
    router.replace(`/dashboard/merchants?${params.toString()}`)
  }

  //Loading state management
  const withLoadingState = async <T,>(
    operation: () => Promise<T>
  ): Promise<T> => {
    setIsLoading(true)
    try {
      return await operation()
    } finally {
      setIsLoading(false)
    }
  }

  //Search management
  const handleSearch = useDebouncedCallback(
    (type: SearchType, value: string) => {
      const params = new URLSearchParams(window.location.search)

      // Clear previous search parameters
      searchTypes.forEach((t) => params.delete(t))

      if (value.trim()) {
        params.set(type, value.trim())
        params.set("page", "1")
      } else {
        params.delete("page")
      }

      updateUrlParams(params)
      router.refresh()
    },
    WAIT_BETWEEN_CHANGE,
    { maxWait: WAIT_BETWEEN_CHANGE * 2 }
  )

  //Create merchant management
  const handleCreate = async (values: Merchant) => {
    await withLoadingState(async () => {
      const result = await createMerchantAction(values)
      if (result.success) {
        setIsModalVisible(false)
        setSelectedMerchant(undefined)
        router.refresh()
        notifySuccess({
          message: "Merchant created",
        })
      } else {
        notifyError({
          message: "Error creating merchant",
          description: result.error,
        })
      }
    })
  }

  //Update merchant management
  const handleUpdate = async (values: Merchant) => {
    if (!selectedMerchant?.id) return

    await withLoadingState(async () => {
      const result = await updateMerchantAction(values, selectedMerchant.id)
      if (result.success) {
        setIsModalVisible(false)
        setSelectedMerchant(undefined)
        router.refresh()
        notifySuccess({
          message: "Merchant updated",
        })
      } else {
        notifyError({
          message: "Error updating merchant",
          description: result.error,
        })
      }
    })
  }

  const handleModalControl = (merchant?: Merchant) => {
    setSelectedMerchant(merchant)
    setIsModalVisible(!isModalVisible)
  }

  return (
    <div className="h-full w-full p-4">
      <div className="flex w-full items-center mb-4">
        <SearchComponent
          onSearch={(type, value) => handleSearch(type as SearchType, value)}
          initialType={currentSearchType}
          initialValue={currentSearchValue}
          options={[
            { value: "name", label: "Name" },
            { value: "id", label: "ID" },
            { value: "clientId", label: "Client ID" },
          ]}
        />
        <div className="ml-auto">
          <Button
            type="primary"
            ghost
            icon={<PlusOutlined />}
            onClick={() => handleModalControl()}
          >
            Create Merchant
          </Button>
        </div>
      </div>
      <CommonTable<Merchant>
        entityType="merchant"
        dataSource={merchants}
        currentPage={currentPage}
        loading={isLoading}
        onEdit={handleModalControl}
        onPageChange={(page) => {
          setCurrentPage(page)
        }}
      />
      <FormComponent<Merchant>
        key={`${isModalVisible}-${
          selectedMerchant ? selectedMerchant.id : "new"
        }`}
        visible={isModalVisible}
        title={selectedMerchant ? "Edit Merchant" : "Create Merchant"}
        initialValues={selectedMerchant}
        onSubmit={selectedMerchant ? handleUpdate : handleCreate}
        onCancel={() => handleModalControl()}
        formType="merchant"
      />
    </div>
  )
}
