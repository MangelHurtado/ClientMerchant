"use client"

import { CSSProperties, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Client } from "@/common/types/client"
import {
  ClientFormComponent,
  SearchClientComponent,
} from "@/common/components/ClientComponent/Delivery"
import useCases from "@/service/src/application"

import { EditOutlined, PlusOutlined } from "@ant-design/icons"
import { Table, Button, Alert } from "antd"
import { useThemedNotification } from "@/app/hooks/useThemedNotification"
import { useAuth } from "@/app/context/AuthContext"

import { useDebouncedCallback } from "use-debounce"

//Extract error message from error object
const extractErrorMessage = (error: unknown): string => {
  return (
    (error as any)?.response?.data?.error ||
    (error as any)?.body?.error ||
    (error instanceof Error ? error.message : "An unexpected error occurred")
  )
}

const WAIT_BETWEEN_CHANGE = 300

const ClientsPage = () => {
  //State management
  const router = useRouter()
  const searchParams = useSearchParams()
  const { notifySuccess, notifyError } = useThemedNotification()
  const { token } = useAuth()
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(
    undefined
  )
  const [error, setError] = useState<string | null>(null)

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

  //Fetch and update clients management
  const fetchAndUpdateClients = async () => {
    try {
      const data = await useCases.clients.getClients(null, token)
      setClients(data)
      setError(null)
    } catch (error) {
      console.error("Error fetching clients:", error)
      setClients([])
      setError(extractErrorMessage(error))
    }
  }

  //Client operation management (create, update)
  const handleClientOperation = async (
    operation: () => Promise<void>,
    actionType: "create" | "update"
  ) => {
    await withLoadingState(async () => {
      try {
        await operation()
        await fetchAndUpdateClients()
        setIsModalVisible(false)
        setSelectedClient(undefined)
        notifySuccess({
          message: `Client ${actionType === "create" ? "created" : "updated"}`,
        })
      } catch (error) {
        notifyError({
          message: `Error ${
            actionType === "create" ? "creating" : "updating"
          } client`,
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
    async (
      type: "id" | "name" | "email",
      value: string,
      pageParam?: string
    ) => {
      if (!value.trim()) {
        await withLoadingState(async () => {
          await fetchAndUpdateClients()
          const params = new URLSearchParams()
          if (searchParams.get("page")) {
            params.set("page", searchParams.get("page")!)
          }
          updateUrlParams(params)
        })
        return
      }

      //Search by id, name or email
      await withLoadingState(async () => {
        const params = new URLSearchParams()
        // Clear any existing search params
        ;["id", "name", "email"].forEach((param) => {
          if (params.has(param)) params.delete(param)
        })
        params.set(type, value)
        params.set("page", pageParam || "1")
        updateUrlParams(params)

        try {
          const result =
            type === "id"
              ? await useCases.clients.findClientById(null, value, token)
              : type === "email"
              ? await useCases.clients.findClientByEmail(null, value, token)
              : await useCases.clients.findClientByName(null, value, token)

          setClients(
            type === "id" || type === "email"
              ? result
                ? [result]
                : []
              : Array.isArray(result) && result.length > 0
              ? result
              : []
          )
        } catch (error) {
          console.error("Error during search:", error)
          setClients([])
          const maybeStatus =
            (error as any)?.response?.status || (error as any)?.status
          const errorMessage = extractErrorMessage(error).toLowerCase()
          if (
            (type === "id" || type === "email") &&
            (maybeStatus === 404 || errorMessage.includes("not found"))
          ) {
            setError(null)
          } else {
            setError(errorMessage)
          }
        }
      })
    },
    WAIT_BETWEEN_CHANGE,
    { maxWait: WAIT_BETWEEN_CHANGE * 2 }
  )

  //Create client management
  const handleCreate = (values: Client) => {
    handleClientOperation(async () => {
      await useCases.clients.createClient(null, values, token)
    }, "create")
  }

  //Update client management
  const handleUpdate = (values: Client) => {
    if (!selectedClient?.id) return
    handleClientOperation(async () => {
      await useCases.clients.updateClient(
        null,
        values,
        token,
        selectedClient.id
      )
    }, "update")
  }

  //Initial load management
  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10)
    setCurrentPage(page)

    // Check which search param is present
    const searchType = ["id", "name", "email"].find((type) =>
      searchParams.has(type)
    )
    if (searchType) {
      const value = searchParams.get(searchType) || ""
      handleSearch(
        searchType as "id" | "name" | "email",
        value,
        page.toString()
      )
    } else {
      fetchAndUpdateClients()
    }
  }, [searchParams])

  const paginationStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
  }

  const handleModalControl = (client?: Client) => {
    setSelectedClient(client)
    setIsModalVisible(!isModalVisible)
  }

  //Client table
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Surname", dataIndex: "surname", key: "surname" },
    { title: "CIF/NIF/NIE", dataIndex: "cifNifNie", key: "cifNifNie" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Client) => (
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
        <SearchClientComponent
          onSearch={handleSearch}
          initialType={
            (["id", "name", "email"].find((type) => searchParams.has(type)) as
              | "id"
              | "name"
              | "email") || "name"
          }
          initialValue={
            searchParams.get(
              ["id", "name", "email"].find((type) => searchParams.has(type)) ||
                "name"
            ) || ""
          }
        />
        <Button
          type="primary"
          ghost
          icon={<PlusOutlined />}
          onClick={() => handleModalControl()}
        >
          Create Client
        </Button>
      </div>
      {error && (
        <Alert message={error} type="error" style={{ marginBottom: 16 }} />
      )}
      <Table
        className="w-full"
        dataSource={clients}
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
            router.replace(`/dashboard/clients?${params.toString()}`)
          },
        }}
        loading={isLoading}
      />
      <ClientFormComponent
        key={`${isModalVisible}-${selectedClient ? selectedClient.id : "new"}`}
        visible={isModalVisible}
        initialValues={selectedClient}
        onSubmit={selectedClient ? handleUpdate : handleCreate}
        onCancel={() => handleModalControl()}
      />
    </div>
  )
}

export default ClientsPage
