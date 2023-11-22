import React from 'react'
import { Box, Flex, Spacer, IconButton, useDisclosure, Collapse, Input, InputGroup, InputLeftElement, Center, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, Button, Spinner } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, SearchIcon, SettingsIcon, WarningTwoIcon, AtSignIcon } from '@chakra-ui/icons'
import { Link, useLocation } from 'react-router-dom'
import { parseLocarstorageUser } from '../__helpers/isUser'
import { userSlice } from '../redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import { useGetAllCategoriesQuery } from '../services/category.service'
import userEnum from '../enums/user.enum'

function Navbar() {
  const location = useLocation()
  const dispatch = useDispatch()
  const { isOpen: categoriesAreOpen, onToggle: openCategories } = useDisclosure()
  const { isOpen: categoriesAreOpen2, onToggle: openCategories2 } = useDisclosure()

  const user = parseLocarstorageUser()

  // The categories are searched

  const { data: categories, isFetching: isFetchingCategories } = useGetAllCategoriesQuery()

  return (<Flex flexDirection={'column'} width={'100%'} maxWidth={'1200px'}>

    <Box bg="gray.600" px={4} width={'100%'} maxWidth={'1200px'} >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          aria-label='Open Menu'
          colorScheme="white"
          icon={categoriesAreOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={openCategories}
          display={{ md: 'none' }}
        />
        <Link to="/">
          Logo
        </Link>
        <Spacer />
        <InputGroup width={['13rem', '15rem', '20rem']} color={'white'}>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='gray.300' />
          </InputLeftElement>
          <Input type='tel' placeholder='Buscar un producto' />
        </InputGroup>
        <Spacer />
        <Flex display={['none', 'none', 'flex', 'flex']} alignItems="center">
          <Link to={'/about'}>
            <Flex alignItems="center"  mr={6} color="white">
              Aboutss
            </Flex>
          </Link>
          <Link to={'/services'}>
            <Flex alignItems="center"  mr={6} color="white">
              Services
            </Flex>
          </Link>
          <Link to={'/contact'}>
            <Flex alignItems="center"  mr={6} color="white">
              Contact
            </Flex>
          </Link>
        </Flex>
        {!user ?
          <Flex>
            { /* Login Button */}
            <Link to={'/login'}>
              <Button display={['none', 'none', 'flex', 'flex']} bg={'gray.600'} mr={6} color="white" fontWeight={'bold'} px={10} py={2} cursor={'pointer'} _hover={{ bg: 'gray.500' }}>
                Login
              </Button>
              <IconButton
                aria-label='Open Menu'
                colorScheme="white"
                icon={<SettingsIcon />}
                display={['flex', 'flex', 'none', 'none']}
              />
            </Link>
          </Flex>
          :
          <>
            {/* Profile popover */}
            <Popover placement='bottom-start'>
              <PopoverTrigger>
                <Flex>
                  <Button display={['none', 'none', 'flex', 'flex']} bg={'gray.600'} mr={6} color="white" fontWeight={'bold'} px={10} py={2} cursor={'pointer'} _hover={{ bg: 'gray.500' }}>
                    {user.username}
                  </Button>
                  <IconButton
                    aria-label='Open Menu'
                    colorScheme="white"
                    icon={<AtSignIcon color='gray.300' />}
                    display={['flex', 'flex', 'none', 'none']}
                  />
                </Flex>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow bg={'teal.500'} />
                <PopoverBody
                  display={'flex'}
                  width={'100%'}
                  px={'10px'}
                  py={'10px'}
                  color='white'
                  bg='teal.500'
                  rounded='md'
                  shadow='md'
                  flexDir={'column'}
                >
                  <Link to={'/products/register'}>
                    <Flex color="white" padding={'1rem'} _hover={{ bg: 'teal.400' }}>
                     Register a product
                    </Flex>
                  </Link>
                  <Link to={'/categories/register'}>
                    <Flex color="white" padding={'1rem'} _hover={{ bg: 'teal.400' }}>
                    Register a category
                    </Flex>
                  </Link>
                  { (user.role === userEnum.role.admin) ? <>
                    <Link to={'/users/search'}>
                      <Flex color="white" padding={'1rem'} _hover={{ bg: 'teal.400' }}>
                      Search user
                      </Flex>
                    </Link>
                  </> : <>
                    <Link to={'/users/update'} state={user.username}>
                      <Flex color="white" padding={'1rem'} _hover={{ bg: 'teal.400' }}>
                        Update information
                      </Flex>
                    </Link>
                  </>}
                  <Link to={'/categories/categorie_4'}>
                    <Flex color="white" padding={'1rem'} _hover={{ bg: 'teal.400' }}>
                    Contact4
                    </Flex>
                  </Link>
                  <Link to={location.pathname}>
                    <Button fontWeight={'bold'} width={'100%'} height={'auto'} alignItems={'center'} justifyContent={'center'} bg={'red.200'} color="white" paddingY={'1rem'} _hover={{ bg: 'blue.500' }}
                      onClick={() => {
                        localStorage.removeItem('user')
                        localStorage.removeItem('token')
                        dispatch(userSlice.actions.deleteUser())
                      }}
                    >
                      Loggout <WarningTwoIcon mx={2} />
                    </Button>
                  </Link>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </>
        }
      </Flex>

      <Collapse in={categoriesAreOpen} animateOpacity>
        <Center
          pb={4}
          flexDir={'column'}
          justifyContent={'initial'}
          overflow={'scroll'} fontSize={'1rem'}
          fontWeight={'bold'} minHeight={categoriesAreOpen ? '100vh' : '100vh'}
          display={['flex', 'flex', 'none', 'none']}
        >
          <Link to={'/about'}>
            <Flex alignItems="center"  mr={6} color="white" marginTop={'3rem'} marginBottom={'1rem'}>
              Abouts
            </Flex>
          </Link>
          <Flex alignItems="center"  mr={6} color="white" marginTop={'3rem'} marginBottom={'1rem'} onClick={openCategories2}>
            Categorias
          </Flex>
          <Collapse in={categoriesAreOpen2} animateOpacity style={{ width: '100%' }}>
            <Flex
              width={'100%'}
              px={'10px'}
              py={'5px'}
              color='white'
              mt='2'
              bg='teal.500'
              rounded='md'
              shadow='md'
              flexDir={'column'}
            >
              {
                isFetchingCategories ?
                  <Spinner /> :
                  categories ? categories.map((categorie) => (
                    <Link to={`/products/category/${categorie.name}`} key={categorie._id}>
                      <Flex alignItems="center"  color="white" marginY={'1rem'}>
                        {categorie.name}
                      </Flex>
                    </Link>
                  )) : null
              }
            </Flex>
          </Collapse>
          <Link to={'/contact'}>
            <Flex alignItems="center"  mr={6} color="white" marginTop={'3rem'} marginBottom={'1rem'}>
              Contact
            </Flex>
          </Link>
          { !user && <>
            <Link to={'/login'}>
              <Flex alignItems="center"  mr={6} color="white" marginTop={'3rem'} marginBottom={'1rem'}>
              Login
              </Flex>
            </Link>
          </>}
        </Center>
      </Collapse>
    </Box >

    {/* Categories popover for big screen  */}
    <Box bg="gray.600" px={10} width={'100%'} maxWidth={'1200px'} display={['none', 'none', 'block', 'block']}>
      <Flex paddingBottom={1} alignItems="center" justifyContent="space-between">
        <Popover placement='bottom-start' trigger="hover">
          <PopoverTrigger>
            <Flex mr={6} color="white" fontWeight={'bold'} px={10} py={2} _hover={{ bg: 'gray.500' }}>
              Categories
            </Flex>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow bg={'teal.500'} />
            <PopoverBody
              display={'flex'}
              width={'100%'}
              px={'10px'}
              py={'5px'}
              color='white'
              bg='teal.500'
              rounded='md'
              shadow='md'
              flexDir={'column'}
            >
              {
                isFetchingCategories ?
                  <Spinner /> :
                  categories ? categories.map((categorie) => (
                    <Link to={`/products/category/${categorie.name}`} key={categorie._id}>
                      <Flex color="white" padding={'1rem'} _hover={{ bg: 'teal.400' }}>
                        {categorie.name}
                      </Flex>
                    </Link>
                  )) : null

              }
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Spacer />
        <Link to={'/offers'}>
          <Flex mr={6} color="white" fontWeight={'bold'} px={10} py={2} _hover={{ bg: 'gray.500' }}>
              Offers
          </Flex>
        </Link>
        <Spacer />
      </Flex>
    </Box >

  </Flex>

  )
}

export default Navbar
