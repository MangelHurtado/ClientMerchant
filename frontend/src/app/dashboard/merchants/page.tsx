"use client"

import { CSSProperties, useEffect, useState } from "react"
import { useTheme } from "@/app/context/ThemeContext"

import { useRouter, useSearchParams } from "next/navigation"

import { Merchant } from "@/common/types/merchant"
import { MerchantFormComponent } from "@/common/components/MerchantComponent/Delivery"
import { SearchMerchantComponent } from "@/common/components/MerchantComponent/Delivery"
import useCases from "@/service/src/application"

import { EditOutlined, PlusOutlined } from "@ant-design/icons"
import { Table, Button } from "antd"
import { useThemedNotification } from "@/app/hooks/useThemedNotification"

import { useDebouncedCallback } from "use-debounce"

const WAIT_BETWEEN_CHANGE = 300

const MerchantsPage = () => {
  //State management
  const router = useRouter()
  const searchParams = useSearchParams()
  const { notifySuccess, notifyError } = useThemedNotification()
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedMerchant, setSelectedMerchant] = useState<
    Merchant | undefined
  >(undefined)

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

  //Fetch and update merchants management
  const fetchAndUpdateMerchants = async () => {
    try {
      const data = await useCases.getMerchants()
      setMerchants(data)
    } catch (error) {
      console.error("Error fetching merchants:", error)
      setMerchants([])
    }
  }

  //Merchant operation management (create, update)
  const handleMerchantOperation = async (
    operation: () => Promise<void>,
    actionType: "create" | "update"
  ) => {
    await withLoadingState(async () => {
      try {
        await operation()
        await fetchAndUpdateMerchants()
        setIsModalVisible(false)
        setSelectedMerchant(undefined)
        notifySuccess({
          message: `Merchant ${
            actionType === "create" ? "created" : "updated"
          }`,
        })
      } catch (error) {
        notifyError({
          message: `Error ${
            actionType === "create" ? "creating" : "updating"
          } merchant`,
          description:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        })
      }
    })
  }

  //Search management
  const handleSearch = useDebouncedCallback(
    async (type: "id" | "name", value: string, pageParam?: string) => {
      if (!value.trim()) {
        await withLoadingState(async () => {
          await fetchAndUpdateMerchants()
          const params = new URLSearchParams()
          if (searchParams.get("page")) {
            params.set("page", searchParams.get("page")!)
          }
          updateUrlParams(params)
        })
        return
      }

      //Search by id or name
      await withLoadingState(async () => {
        const params = new URLSearchParams()
        params.set("type", type)
        params.set("value", value)
        params.set("page", pageParam || "1")
        updateUrlParams(params)

        try {
          const result =
            type === "id"
              ? await useCases.findById(null, value)
              : await useCases.findByName(null, value)

          setMerchants(
            type === "id"
              ? result
                ? [result]
                : []
              : Array.isArray(result) && result.length > 0
              ? result
              : []
          )
        } catch (error) {
          console.error("Error during search:", error)
          setMerchants([])
        }
      })
    },
    WAIT_BETWEEN_CHANGE,
    { maxWait: WAIT_BETWEEN_CHANGE * 2 }
  )

  //Create merchant management
  const handleCreate = (values: Merchant) => {
    handleMerchantOperation(async () => {
      await useCases.createMerchant(null, values)
    }, "create")
  }

  //Update merchant management
  const handleUpdate = (values: Merchant) => {
    if (!selectedMerchant?.id) return
    handleMerchantOperation(async () => {
      await useCases.updateMerchant(
        null,
        values,
        undefined,
        selectedMerchant.id
      )
    }, "update")
  }

  //Initial load management
  useEffect(() => {
    const type = (searchParams.get("type") as "id" | "name") || "name"
    const value = searchParams.get("value") || ""
    const page = parseInt(searchParams.get("page") || "1", 10)
    setCurrentPage(page)

    if (value) {
      handleSearch(type, value, page.toString())
    } else {
      fetchAndUpdateMerchants()
    }
  }, [searchParams])

  const paginationStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
  }

  const handleModalControl = (merchant?: Merchant) => {
    setSelectedMerchant(merchant)
    setIsModalVisible(!isModalVisible)
  }

  //Merchant table
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Type", dataIndex: "merchantType", key: "merchantType" },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Merchant) => (
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => handleModalControl(record)}
        />
      ),
    },
  ]

  return (
    <div className="h-full w-full p-4">
      <div className="flex justify-between mb-4">
        <SearchMerchantComponent
          onSearch={handleSearch}
          initialType={(searchParams.get("type") as "id" | "name") || "name"}
          initialValue={searchParams.get("value") || ""}
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

export default MerchantsPage
