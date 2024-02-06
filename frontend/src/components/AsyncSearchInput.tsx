import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useDebouncedCallback } from 'use-debounce'


function AsyncSearchInput() {

  const [searchParams] = useSearchParams() // Hook para obtener los parametros de la url
  const navigate = useNavigate() //  Hook para cambiar el path del navegador
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (searchParams.get('search')) {
      setInputValue('')
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.trim() === '') return
    navigate(`/products/search?search=${inputValue}`)
  }

  // Debounce for the search input when the user is typing
  const searchDebounce = useDebouncedCallback((value: string) => {
    if (value.trim() === '') return
    navigate(`/products/search?search=${value}`)
  }
  , 1000)

  return (

    <form onSubmit={handleSubmit} style={{ width:'100%', display: 'flex', justifyContent: 'center' }}>
      <InputGroup width={['70%','70%','60%','60%']}>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon color='gray.300' />
        </InputLeftElement>
        <Input
          placeholder="Search products..."
          defaultValue={searchParams.get('search') || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value)
            searchDebounce(e.target.value)
          }}
          color={'gray.900'}
          bg={'gray.100'}
          _placeholder={{ color: 'gray.900' }}
        />
      </InputGroup>
      <button type="submit" style={{ display: 'none' }} />
    </form>
  )
}

export default AsyncSearchInput