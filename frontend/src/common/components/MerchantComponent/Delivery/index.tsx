"use client"

import { CSSProperties, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Merchant } from "@/common/types/merchant"
import MerchantFormComponent from "./components/MerchantFormComponent"
import SearchComponent from "@/common/components/SearchComponent"
import {
  createMerchantAction,
  updateMerchantAction,
  searchMerchants,
} from "../Infrastructure/merchantActions"

import { PlusOutlined } from "@ant-design/icons"
import { Button } from "antd"
import CommonTable from "@/common/components/Table"
import { useThemedNotification } from "@/common/hooks/useThemedNotification"

import { useDebouncedCallback } from "use-debounce"

const WAIT_BETWEEN_CHANGE = 300

interface MerchantDeliveryProps {
  searchParams?: {
    query?: string
    page?: string
  }
}

export default function MerchantDelivery({
  searchParams,
}: MerchantDeliveryProps) {
  const router = useRouter()
  const { notifySuccess, notifyError } = useThemedNotification()

  // Extract searchParams values
  const pageParam = searchParams?.page
  const queryStr = searchParams?.query || ""

  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(parseInt(pageParam || "1", 10))
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedMerchant, setSelectedMerchant] = useState<
    Merchant | undefined
  >(undefined)

  useEffect(() => {
    const loadMerchants = async () => {
      setIsLoading(true)
      try {
        const data = await searchMerchants(searchParams || {})
        setMerchants(data)
      } catch (error) {
        console.error("Error loading merchants:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMerchants()
  }, [searchParams])

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
    async (type: string, value: string) => {
      const params = new URLSearchParams()

      if (value.trim()) {
        params.set(type, value)
        params.set("page", "1")
      } else if (pageParam) {
        params.set("page", pageParam)
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
      <div className="flex justify-between mb-4">
        <SearchComponent
          onSearch={(type, value) => handleSearch(type, value)}
          initialType="name"
          initialValue={queryStr}
          options={[
            { value: "name", label: "Name" },
            { value: "id", label: "ID" },
            { value: "clientId", label: "Client ID" },
          ]}
        />
        <Button
          type="primary"
          ghost
          icon={<PlusOutlined />}
          onClick={() => handleModalControl()}
        >
          Create Merchant
        </Button>
      </div>
      <CommonTable<Merchant>
        entityType="merchant"
        dataSource={merchants}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page)
          const params = new URLSearchParams()
          if (searchParams) {
            Object.entries(searchParams).forEach(([key, value]) => {
              params.set(key, String(value))
            })
          }
          params.set("page", page.toString())
          router.replace(`/dashboard/merchants?${params.toString()}`)
          router.refresh()
        }}
        loading={isLoading}
        onEdit={handleModalControl}
      />
      <MerchantFormComponent
        key={`${isModalVisible}-${
          selectedMerchant ? selectedMerchant.id : "new"
        }`}
        visible={isModalVisible}
        initialValues={selectedMerchant}
        onSubmit={selectedMerchant ? handleUpdate : handleCreate}
        onCancel={() => handleModalControl()}
      />
    </div>
  )
}
