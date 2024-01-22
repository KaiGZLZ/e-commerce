import React from 'react'
import { Flex, Box, Text,  Grid } from '@chakra-ui/react'
import moment from 'moment'
import { NumericFormat } from 'react-number-format'
import { Link } from 'react-router-dom'
import salesEnum from '../enums/sales.enum'

function SalesList({ sales }: { sales: Sale[] }) {

  return (
    <Flex flexDirection={'column'} width={'100%'} maxWidth={'1200px'} background={'#e3ac49'} alignItems={'center'}>

      <Box background={'white'} fontSize={'18px'}  borderRadius={10} marginBottom={'20px'} marginTop={'20px'} paddingY={'10px'} width={'95%'}>
        <Grid
          gridTemplateColumns={['repeat(3, 1fr)','repeat(3, 1fr)','repeat(5, 1fr)','repeat(5, 1fr)']}
          justifyContent={'center'}
          alignItems={'center'}
          textAlign={'center'}
          fontWeight={'bold'}
          width={'100%'}
        >
          <Flex justifyContent={'center'} alignItems={'center'}>
            <Text>Status</Text>
          </Flex>
          <Flex justifyContent={'center'} alignItems={'center'}>
            <Text>Creation date</Text>
          </Flex>
          <Flex justifyContent={'center'} alignItems={'center'} display={['none','none','flex', 'flex']}>
            <Text>Quantity</Text>
          </Flex>
          <Flex justifyContent={'center'} alignItems={'center'}>
            <Text>Price</Text>
          </Flex>
          <Flex justifyContent={'center'} alignItems={'center'} display={['none','none','flex', 'flex']}>
            <Text>Username</Text>
          </Flex>
        </Grid>
      </Box>

      {
        sales.map((sale, index) => {

          return <Box key={index} background={'white'} borderRadius={10} marginBottom={'10px'} paddingBottom={'10px'} width={'95%'}>

            <Link to={`/sales/sale/${sale._id}`}>
              <Grid
                gridTemplateColumns={['repeat(3, 1fr)','repeat(3, 1fr)','repeat(5, 1fr)','repeat(5, 1fr)']}
                justifyContent={'center'}
                alignItems={'center'}
                textAlign={'center'}
                fontWeight={'bold'}
                fontSize={'15px'}
              >
                <Flex justifyContent={'center'} alignItems={'center'}>
                  <Flex
                    bg={sale.status===salesEnum.status.received ? '#3fcb3f' : '#f46868'}
                    width={'auto'}
                    padding={'0.5rem'}
                    color={'white'}
                  >
                    {salesEnum.statusDescription[sale.status]}
                  </Flex>
                </Flex>

                <Box wordBreak={'break-word'} overflow={'hidden'} padding={'1rem'}>
                  {moment(sale.createdAt).format('DD/MM/YYYY')}
                </Box>


                <Flex wordBreak={'break-word'} overflow={'hidden'} padding={'1rem'} justifyContent={'center'} alignItems={'center'} display={['none','none','flex', 'flex']}>
                  <Text>Quantity: &nbsp;</Text>
                  {sale.totalQuantity}
                </Flex>

                <Grid gridTemplateColumns={'repeat(2, 1fr)'} paddingX={[0,0,'2rem','2rem']}>
                  { (sale.totalQuantity < sale.totalQuantity)  ? <>
                    <NumericFormat value={sale.total} displayType={'text'} decimalScale={2} thousandSeparator='.' decimalSeparator=',' prefix={'$'} />
                  </> : <>
                    <NumericFormat style={{ color: 'red', textDecorationLine: 'line-through' }} value={sale.total} displayType={'text'} decimalScale={2} thousandSeparator='.' decimalSeparator=',' prefix={'$'} />

                    <NumericFormat value={sale.total} displayType={'text'} decimalScale={2} thousandSeparator='.' decimalSeparator=',' prefix={'$'} />
                  </>}
                </Grid>

                <Box wordBreak={'break-word'} overflow={'hidden'} padding={'1rem'} display={['none','none','block', 'block']}>
                  <Text>{sale.user?.username} </Text>
                </Box>
              </Grid>
            </Link>
          </Box>
        })
      }
    </Flex>
  )
}

export default SalesList