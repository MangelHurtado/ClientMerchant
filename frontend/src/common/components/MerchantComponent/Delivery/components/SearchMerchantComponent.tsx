"use client"

import { Select, Input } from "antd"
import { useEffect, useState } from "react"

interface SearchMerchantComponentProps {
  onSearch: (type: "id" | "name" | "clientId", value: string) => void
  initialValue?: string
  initialType?: "id" | "name" | "clientId"
}

const SearchMerchantComponent = ({
  onSearch,
  initialValue = "",
  initialType = "name",
}: SearchMerchantComponentProps) => {
  const [searchType, setSearchType] = useState<"id" | "name" | "clientId">(
    initialType
  )
  const [searchValue, setSearchValue] = useState(initialValue)

  useEffect(() => {
    onSearch(searchType, searchValue)
  }, [searchType, searchValue, onSearch])

  return (
    <div className="flex gap-4 mb-4">
      <Select
        defaultValue="name"
        style={{ width: 120 }}
        onChange={(value: "id" | "name" | "clientId") => setSearchType(value)}
        options={[
          { value: "name", label: "Name" },
          { value: "id", label: "ID" },
          { value: "clientId", label: "Client ID" },
        ]}
      />
      <Input
        placeholder={`Search by ${searchType}...`}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{ width: 300 }}
      />
    </div>
  )
}

export default SearchMerchantComponent
