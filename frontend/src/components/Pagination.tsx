import React from 'react'
import { Box, Button, Flex, Text } from '@chakra-ui/react'


export function Pagination({ defaultCurrentPage, totalPages, onChangePage }: { totalPages: number, defaultCurrentPage: number | undefined | null, onChangePage: (page: number) => void }) {

  const [currentPage, setCurrentPage] = React.useState(defaultCurrentPage ? defaultCurrentPage - 1 : 0)

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    onChangePage(newPage + 1)
  }

  React.useEffect(() => {
    if (defaultCurrentPage && defaultCurrentPage !== currentPage + 1) {
      setCurrentPage(defaultCurrentPage - 1)
    }
  }, [defaultCurrentPage])

  return (
    <Flex justify="center" mt={4}>
      <Button onClick={() => handlePageChange(currentPage - 1)} isDisabled={currentPage === 0}>
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, index) => index)
        .filter(index => Math.abs(currentPage - index) <= 2 || index === 0 || index === totalPages - 1)
        .map((index) => {
          // If the current page number is more than 3 away from the first or last page number
          // and this is the first or last page number, render an ellipsis before it
          const isFirstPageNumber = index === 0
          const isLastPageNumber = index === totalPages - 1
          const shouldRenderEllipsisBegin = (isFirstPageNumber && Math.abs(currentPage - index) > 3)
          const shouldRenderEllipsisEnd = (isLastPageNumber && Math.abs(currentPage - index) > 3)

          return (
            <React.Fragment key={index}>
              {shouldRenderEllipsisEnd && <Text mx={1}>...</Text>}
              <Box
                border={'1px'}
                borderColor={'gray.200'}
                paddingX={3}
                paddingY={1}
                marginX={1}
                borderRadius={'md'}
                bg={currentPage === index ? 'blue.500' : 'white'}
                color={currentPage === index ? 'white' : 'black'}
                cursor="pointer"
                onClick={() => handlePageChange(index)}
              >
                <Text>{index + 1}</Text>
              </Box>

              {shouldRenderEllipsisBegin && <Text mx={1}>...</Text>}
            </React.Fragment>
          )
        })}
      <Button onClick={() => handlePageChange(currentPage + 1)} isDisabled={currentPage === totalPages - 1}>
        Next
      </Button>
    </Flex>
  )
}