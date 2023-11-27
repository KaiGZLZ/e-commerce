import React from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { Flex, Box, Select } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

function Filter() {

  const location = useLocation()

  const categoryName = location.pathname.split('/')[3]

  const [searchParams, setSearchParams] = useSearchParams()

  const onChangeOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {

    if(e.target.value){
      if(e.target.value === 'Most Expensive'){
        searchParams.set('order', 'price')
        searchParams.set('orderType', 'desc')
      }
      else if (e.target.value === 'Cheaper') {
        searchParams.set('order', 'price')
        searchParams.set('orderType', 'asc')
      }
      else if (e.target.value === 'Name') {
        searchParams.set('order', 'name')
        searchParams.set('orderType', 'asc')
      }
      setSearchParams(searchParams)
    }
    else{
      searchParams.delete('order')
      searchParams.delete('orderType')
    }
  }

  let defaultSelectValue = ''

  if (searchParams.get('order') && searchParams.get('orderType')) {
    if (searchParams.get('order') === 'price' && searchParams.get('orderType') === 'desc') {
      defaultSelectValue = 'Most Expensive'
    }
    else if (searchParams.get('order') === 'price' && searchParams.get('orderType') === 'asc') {
      defaultSelectValue = 'Cheaper'
    }
    else if (searchParams.get('order') === 'name' && searchParams.get('orderType') === 'asc') {
      defaultSelectValue = 'Name'
    }
  }

  return ( <>
    <Flex width={'100%'} height={'50px'} alignItems={'center'} justifyContent={'space-between'}>
      <Box fontSize={15} pl={'20px'}>
        <Link to={'/'}>Home</Link> <ChevronRightIcon/> {categoryName}
      </Box>
      <Flex fontSize={15} pr={'20px'} flexDirection={'row'} alignItems={'center'} >
        Order By:
        <Select size={'sm'}
          placeholder="Select option"
          width={'200px'}
          border={'none'}
          value={defaultSelectValue}
          onChange={onChangeOrder}
        >
          <option value="Cheaper">Cheaper</option>
          <option value="Most Expensive">Most Expensive</option>
          <option value="Name">Name</option>
        </Select>
      </Flex>
    </Flex>
  </>
  )
}

export default Filter