"use client"

import { Select, Input } from "antd"
import { useEffect, useState } from "react"

interface SearchClientComponentProps {
  onSearch: (type: "id" | "name", value: string) => void
}

const SearchClientComponent = ({ onSearch }: SearchClientComponentProps) => {
  const [searchType, setSearchType] = useState<"id" | "name">("name")
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    onSearch(searchType, searchValue)
  }, [searchType, searchValue, onSearch])

  return (
    <div className="flex gap-4 mb-4">
      <Select
        defaultValue="name"
        style={{ width: 120 }}
        onChange={(value: "id" | "name") => setSearchType(value)}
        options={[
          { value: "name", label: "Name" },
          { value: "id", label: "ID" },
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

export default SearchClientComponent
