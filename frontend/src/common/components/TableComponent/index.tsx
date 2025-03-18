import { CSSProperties } from "react"

import { Client } from "@/common/components/ClientComponent/Delivery/interface"
import { Merchant } from "@/common/components/MerchantComponent/Delivery/interface"

import { EditOutlined } from "@ant-design/icons"
import { Table as AntTable, Button } from "antd"

interface CommonTableProps<T extends Client | Merchant> {
  entityType: "client" | "merchant"
  dataSource: T[]
  currentPage: number
  onPageChange: (page: number) => void
  loading: boolean
  onEdit: (record: T) => void
}

const paginationStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
}

export default function CommonTable<T extends Client | Merchant>({
  entityType,
  dataSource,
  currentPage,
  onPageChange,
  loading,
  onEdit,
}: CommonTableProps<T>) {
  const getColumns = () => {
    const commonColumns = [
      { title: "ID", dataIndex: "id", key: "id" },
      { title: "Name", dataIndex: "name", key: "name" },
    ]

    const actionColumn = {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: T) => (
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => onEdit(record)}
        />
      ),
    }

    if (entityType === "client") {
      return [
        ...commonColumns,
        { title: "Surname", dataIndex: "surname", key: "surname" },
        { title: "CIF/NIF/NIE", dataIndex: "cifNifNie", key: "cifNifNie" },
        { title: "Phone", dataIndex: "phone", key: "phone" },
        { title: "Email", dataIndex: "email", key: "email" },
        actionColumn,
      ]
    }

    return [
      ...commonColumns,
      { title: "Address", dataIndex: "address", key: "address" },
      { title: "Type", dataIndex: "merchantType", key: "merchantType" },
      actionColumn,
    ]
  }

  return (
    <AntTable
      className="w-full"
      dataSource={dataSource}
      columns={getColumns()}
      rowKey="id"
      pagination={{
        position: ["bottomCenter"],
        pageSize: 5,
        current: currentPage,
        style: paginationStyle,
        onChange: onPageChange,
      }}
      loading={loading}
    />
  )
}
