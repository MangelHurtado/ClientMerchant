"use client"

import { useEffect, useState } from "react"
import { Table } from "antd"
import useCases from "@/service/src/application"

const MerchantsPage = () => {
  const [merchants, setMerchants] = useState([])

  useEffect(() => {
    const loadMerchants = async () => {
      try {
        const data = await useCases.getMerchants()
        setMerchants(data)
      } catch (error) {
        console.error("Error cargando merchants:", error)
      }
    }
    loadMerchants()
  }, [])

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nombre", dataIndex: "name", key: "name" },
    { title: "Dirección", dataIndex: "address", key: "address" },
    { title: "Tipo", dataIndex: "merchantType", key: "merchantType" },
  ]

  return <Table dataSource={merchants} columns={columns} rowKey="id" />
}

export default MerchantsPage
