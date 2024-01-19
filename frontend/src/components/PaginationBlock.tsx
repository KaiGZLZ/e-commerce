import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Pagination } from './Pagination'


function PaginationBlock({ totalPages }: {totalPages: number | undefined | null}) {

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const handlePageChange = (page: number) => {

    // If page is 1, remove the page param from the url to make it cleaner
    if(page === 1){
      searchParams.delete('page')
    }
    else {
      searchParams.set('page', page.toString())
    }

    navigate(`?${searchParams.toString()}`)
  }

  return (
    <Pagination
      defaultCurrentPage={searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1}
      totalPages={totalPages || 1}
      onChangePage={handlePageChange}

    />
  )
}

export default PaginationBlock
