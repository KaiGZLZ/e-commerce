import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Flex, Select, Input } from '@chakra-ui/react'
import salesEnum from '../enums/sales.enum'
import { useDebouncedCallback } from 'use-debounce'
import { parseLocarstorageUser } from '../__helpers/isUser'
import userEnum from '../enums/user.enum'

function FilterSales() {

  const user = parseLocarstorageUser()

  const [searchParams, setSearchParams] = useSearchParams()

  const onChangeOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {

    if(e.target.value){
      if(e.target.value === 'Most Expensive'){
        searchParams.set('order', 'total')
        searchParams.set('orderType', 'desc')
        searchParams.delete('page')
      }
      else if (e.target.value === 'Cheaper') {
        searchParams.set('order', 'total')
        searchParams.set('orderType', 'asc')
        searchParams.delete('page')
      }
      else if (e.target.value === 'Latest') {
        searchParams.set('order', 'createdAt')
        searchParams.set('orderType', 'asc')
        searchParams.delete('page')
      }
      else if (e.target.value === 'Newest') {
        searchParams.set('order', 'createdAt')
        searchParams.set('orderType', 'desc')
        searchParams.delete('page')
      }
    }
    else{
      searchParams.delete('order')
      searchParams.delete('orderType')
    }
    setSearchParams(searchParams)
  }


  let defaultSelectValue = ''

  if (searchParams.get('order') && searchParams.get('orderType')) {
    if (searchParams.get('order') === 'total' && searchParams.get('orderType') === 'desc') {
      defaultSelectValue = 'Most Expensive'
    }
    else if (searchParams.get('order') === 'total' && searchParams.get('orderType') === 'asc') {
      defaultSelectValue = 'Cheaper'
    }
    else if (searchParams.get('order') === 'createdAt' && searchParams.get('orderType') === 'asc') {
      defaultSelectValue = 'Latest'
    }
    else if (searchParams.get('order') === 'createdAt' && searchParams.get('orderType') === 'desc') {
      defaultSelectValue = 'Newest'
    }
  }


  const onFilterChange = (filter: string, value: string) => {

    if(filter === 'status'){
      if(value){
        searchParams.set('status', value)
        searchParams.delete('page')
      }
      else{
        searchParams.delete('status')
        searchParams.delete('page')
      }
    }

    if (filter === 'user') {
      if (value) {
        searchParams.set('user', value)
        searchParams.delete('page')
      }
      else {
        searchParams.delete('user')
        searchParams.delete('page')
      }
    }
    setSearchParams(searchParams)
  }

  const inputDebounce  = useDebouncedCallback((filter: string) => {
    onFilterChange('user', filter)
  }, 1000)


  return ( <>
    <Flex width={'100%'} height={['auto', 'auto', '50px','50px']} alignItems={'center'} justifyContent={'space-between'} flexDirection={['column','column','row', 'row']}>
      <Flex fontSize={15} pr={'20px'} flexDirection={'row'} alignItems={'center'} >
        Order By: &nbsp; &nbsp;
        <Select size={'sm'}
          placeholder="Select option"
          width={'200px'}
          border={'none'}
          value={defaultSelectValue}
          onChange={onChangeOrder}
        >
          <option value="Cheaper">Cheaper</option>
          <option value="Most Expensive">Most Expensive</option>
          <option value="Latest">Latest</option>
          <option value="Newest">Newest</option>
        </Select>
      </Flex>
      <Flex fontSize={15} pr={'20px'} flexDirection={'row'} alignItems={'center'} marginTop={'2rem'} >
        Filter By: &nbsp; &nbsp;
        <Flex flexDirection={['column','column','row','row']} alignItems={'center'} >
          <Select size={'sm'}
            placeholder="Status"
            width={'200px'}
            border={'none'}
            value={searchParams.get('status') || ''}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onFilterChange('status', e.target.value)
            }
          >
            {
              Object.keys(salesEnum.statusDescription).map((status) => {
                return <option key={status} value={salesEnum.statusDescription[Number(status)]}>
                  {salesEnum.statusDescription[Number(status)]}
                </option>
              })
            }
          </Select>
          {
            (user && user.role === userEnum.role.admin) ?
              <>
                <Input placeholder='User' size={'sm'} width={'200px'} border={'none'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    inputDebounce(e.target.value)

                  }
                />
              </> : null
          }
        </Flex>
      </Flex>
    </Flex>
  </>
  )
}

export default FilterSales