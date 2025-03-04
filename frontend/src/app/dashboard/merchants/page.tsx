import { Table } from "antd"
import useCases from "@/service/src/application"
import { Merchant } from "@/common/types/merchant"
import { CSSProperties } from "react"

const MerchantsPage = async () => {
  const merchants: Merchant[] = await useCases.getMerchants()

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nombre", dataIndex: "name", key: "name" },
    { title: "Dirección", dataIndex: "address", key: "address" },
    { title: "Tipo", dataIndex: "merchantType", key: "merchantType" },
  ]

  const paginationStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
  }

  return (
    <Table
      dataSource={merchants}
      columns={columns}
      rowKey="id"
      pagination={{ position: ["bottomCenter"], style: paginationStyle }}
    />
  )
}

export default MerchantsPage
