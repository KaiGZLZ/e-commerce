
import React from 'react'
import { Box, Flex, Input, InputGroup, InputLeftElement,Button } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
import { useForm  } from 'react-hook-form'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'

type RegisterData = {
  username: string
}

function SearchUser() {

  const navigate = useNavigate()

  // Form data
  const { register, handleSubmit, formState: { errors }, setFocus } = useForm<RegisterData>()

  const onSubmit= (data: RegisterData)  => {
    navigate('/users/update', { state: data.username })
  }

  React.useEffect(() => {
    setFocus('username')
  }, [setFocus])

  return <>
    <Navbar />
    <Flex alignItems={'center'} justifyContent={'center'} width={'100%'} maxWidth={'1200px'} bg={'whiteAlpha.800'}>

      {/* Form container */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir={'column'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} width={'100%'} maxWidth={'1200px'} border={'1px'} padding={'20px'} color={'gray.600'} rounded={10} bg={'gray.50'} marginTop={'50px'} >
          <Flex width={'100%'} justifyContent={'initial'}>
            <Box width={'auto'} fontSize={15} textDecor={'underline'} color={'gray.600'} cursor={'pointer'} _hover={{ color:'#fcb941' }} onClick={() => history.back()}>
              {'Back'}
            </Box>
          </Flex>
          <Box fontSize={30} fontWeight={'bold'} textAlign={'center'} marginBottom={'20px'}> Search user</Box>
          {/* Categorie Name */}
          <Box marginBottom={'20px'}>
            <InputGroup width={['20rem', '20rem', '20rem', '20rem']} color={'black'} >
              <InputLeftElement pointerEvents='none'>
                <ArrowRightIcon color='gray.300' />
              </InputLeftElement>
              <Input type="text" placeholder="Insert an username" {...register('username', { required: 'The username is required' })} />
            </InputGroup>
            {errors.username && <span style={{ color: 'red' }}>{errors.username?.message?.toString()}</span>}
          </Box>
          {/* Submit button */}
          <Flex justifyContent={'space-between'} width={'100%'}>
            <Button colorScheme={'gray'} size="sm" onClick={() => { navigate(-1)}} >
              Cancel
            </Button>
            <Button type='submit' colorScheme="teal" size="sm">
              Search
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  </>
}

export default SearchUser