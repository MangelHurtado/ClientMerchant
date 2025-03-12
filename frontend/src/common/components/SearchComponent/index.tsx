"use client"

import React, { useState, FC, useRef } from "react"
import { Select, Input } from "antd"

interface SearchOption<T extends string> {
  value: T
  label: string
}

interface SearchComponentProps<T extends string> {
  onSearch: (type: T, value: string) => void
  initialValue?: string
  initialType?: T
  options: SearchOption<T>[]
}

const SearchComponent: FC<SearchComponentProps<string>> = ({
  onSearch,
  initialValue = "",
  initialType,
  options,
}) => {
  const [searchType, setSearchType] = useState<string>(
    initialType || options[0].value
  )
  const [searchValue, setSearchValue] = useState(initialValue)
  const lastSearch = useRef({ type: searchType, value: searchValue })

  // Only trigger search if values changed
  const triggerSearch = (type: string, value: string) => {
    if (
      type !== lastSearch.current.type ||
      value !== lastSearch.current.value
    ) {
      lastSearch.current = { type, value }
      onSearch(type, value)
    }
  }

  const handleSearchTypeChange = (value: string) => {
    setSearchType(value)
    triggerSearch(value, searchValue)
  }

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    triggerSearch(searchType, value)
  }

  return (
    <div className="flex gap-4 mb-4">
      <Select
        defaultValue={initialType}
        style={{ width: 120 }}
        onChange={handleSearchTypeChange}
        options={options}
      />
      <Input
        placeholder={`Search by ${searchType}...`}
        value={searchValue}
        onChange={handleSearchValueChange}
        style={{ width: 300 }}
      />
    </div>
  )
}

export default SearchComponent
