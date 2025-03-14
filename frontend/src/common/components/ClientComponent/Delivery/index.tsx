"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/common/context/AuthContext"

import { Client } from "@/common/components/ClientComponent/Delivery/interface"
import FormComponent from "@/common/components/FormComponent"
import SearchComponent from "@/common/components/SearchComponent"
import {
  createClientAction,
  updateClientAction,
  searchClients,
} from "../Infrastructure/clientActions"

import { PlusOutlined } from "@ant-design/icons"
import { Button, Alert } from "antd"
import CommonTable from "@/common/components/TableComponent"
import { useThemedNotification } from "@/common/hooks/useThemedNotification"

import { useDebouncedCallback } from "use-debounce"

const WAIT_BETWEEN_CHANGE = 300

interface ClientDeliveryProps {
  searchParams?: {
    query?: string
    page?: string
  }
}

export default function ClientDelivery({ searchParams }: ClientDeliveryProps) {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { token } = useAuth()
  const { notifySuccess, notifyError } = useThemedNotification()

  // Extract searchParams values
  const pageParam = searchParams?.page
  const queryStr = searchParams?.query || ""

  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(parseInt(pageParam || "1", 10))
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(
    undefined
  )
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && token) {
      const loadClients = async () => {
        setIsLoading(true)
        try {
          const data = await searchClients(searchParams || {}, token)
          setClients(data)
          setError(null)
        } catch (error) {
          console.error("Error loading clients:", error)
          setError(
            error instanceof Error ? error.message : "Failed to load clients"
          )
        } finally {
          setIsLoading(false)
        }
      }

      loadClients()
    }
  }, [searchParams, mounted, token])

  //Update URL params
  const updateUrlParams = (params: URLSearchParams) => {
    router.replace(`/dashboard/clients?${params.toString()}`)
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
        params.set(type, value.trim())
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

  //Create client management
  const handleCreate = async (values: Client) => {
    await withLoadingState(async () => {
      const result = await createClientAction(values, token)
      if (result.success) {
        setIsModalVisible(false)
        setSelectedClient(undefined)
        router.refresh()
        notifySuccess({
          message: "Client created",
        })
      } else {
        notifyError({
          message: "Error creating client",
          description: result.error,
        })
      }
    })
  }

  //Update client management
  const handleUpdate = async (values: Client) => {
    if (!selectedClient?.id) return

    await withLoadingState(async () => {
      const result = await updateClientAction(values, selectedClient.id, token)
      if (result.success) {
        setIsModalVisible(false)
        setSelectedClient(undefined)
        router.refresh()
        notifySuccess({
          message: "Client updated",
        })
      } else {
        notifyError({
          message: "Error updating client",
          description: result.error,
        })
      }
    })
  }

  const handleModalControl = (client?: Client) => {
    setSelectedClient(client)
    setIsModalVisible(!isModalVisible)
  }

  const renderContent = () => {
    if (!mounted) return null

    if (!token) {
      return (
        <div className="h-full w-full p-4 flex justify-center items-center">
          <Alert
            message="Access Denied"
            description="You are not authenticated. Please log in to continue."
            type="warning"
            showIcon
          />
        </div>
      )
    }

    return (
      <>
        <div className="flex w-full items-center mb-4">
          <SearchComponent
            onSearch={(type, value) => handleSearch(type, value)}
            initialType="name"
            initialValue={queryStr}
            options={[
              { value: "name", label: "Name" },
              { value: "id", label: "ID" },
              { value: "email", label: "Email" },
            ]}
          />
          <div className="ml-auto">
            <Button
              type="primary"
              ghost
              icon={<PlusOutlined />}
              onClick={() => handleModalControl()}
            >
              Create Client
            </Button>
          </div>
        </div>
        {error && (
          <Alert message={error} type="error" style={{ marginBottom: 16 }} />
        )}
        <CommonTable<Client>
          entityType="client"
          dataSource={clients}
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
            router.replace(`/dashboard/clients?${params.toString()}`)
            router.refresh()
          }}
          loading={isLoading}
          onEdit={handleModalControl}
        />
        <FormComponent<Client>
          key={`${isModalVisible}-${
            selectedClient ? selectedClient.id : "new"
          }`}
          visible={isModalVisible}
          title={selectedClient ? "Edit Client" : "Create Client"}
          initialValues={selectedClient}
          onSubmit={selectedClient ? handleUpdate : handleCreate}
          onCancel={() => handleModalControl()}
          formType="client"
        />
      </>
    )
  }

  return <div className="h-full w-full p-4">{renderContent()}</div>
}
