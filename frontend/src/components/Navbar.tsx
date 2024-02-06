import React from 'react'
import { Box, Flex, Spacer, IconButton, useDisclosure, Collapse, Center, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, Button, Spinner, Icon } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, SettingsIcon, WarningTwoIcon, AtSignIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from 'react-router-dom'
import { parseLocarstorageUser } from '../__helpers/isUser'
import { userSlice } from '../redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import { useGetAllCategoriesQuery } from '../services/category.service'
import userEnum from '../enums/user.enum'
import AsyncSearchInput from './AsyncSearchInput'
import { api } from '../services/servicesConfig/api.service'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isOpen: categoriesAreOpen, onToggle: openCategories } = useDisclosure()
  const { isOpen: categoriesAreOpen2, onToggle: openCategories2 } = useDisclosure()

  const user = parseLocarstorageUser()

  // The categories are searched

  const { data: categories, isFetching: isFetchingCategories } = useGetAllCategoriesQuery()

  return (<Flex flexDirection={'column'} width={'100%'} alignItems={'center'} justifyContent={'center'} bg={'blackAlpha.900'}>

    <Box px={4} width={'100%'} maxWidth={'1200px'} paddingTop={'1.5rem'} >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          aria-label='Open Menu'
          colorScheme="white"
          icon={categoriesAreOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={openCategories}
          display={{ md: 'none' }}
        />
        <Link to="/">
          <Box
            fontSize={20}
            fontWeight={'bold'}
            width={'10rem'}
            color={'gray.900'}
            bg={'gray.200'}
            rounded={'md'} px={2} py={2}
            _hover={{ bg: 'gray.300' }}
            display={['none', 'none', 'flex', 'flex']}

          >
            E-commerce
          </Box>
        </Link>
        <Spacer />
        <AsyncSearchInput />
        <Spacer />
        {/* <Flex display={['none', 'none', 'flex', 'flex']} alignItems="center">
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
        </Flex> */}
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
                  { (user.role === userEnum.role.admin) ? <>
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
                    <Link to={'/sales/table'} state={user.username}>
                      <Flex color="white" padding={'1rem'} _hover={{ bg: 'teal.400' }}>
                        Purchases table
                      </Flex>
                    </Link>
                    <Link to={'/users/search'}>
                      <Flex color="white" padding={'1rem'} _hover={{ bg: 'teal.400' }}>
                        Search user
                      </Flex>
                    </Link>
                  </> : <>
                    <Link to={'/sales/table'} state={user.username}>
                      <Flex color="white" padding={'1rem'} _hover={{ bg: 'teal.400' }}>
                        Purchases table
                      </Flex>
                    </Link>
                    <Link to={'/users/update'} state={user.username}>
                      <Flex color="white" padding={'1rem'} _hover={{ bg: 'teal.400' }}>
                        Update information
                      </Flex>
                    </Link>
                  </>}
                  <Button fontWeight={'bold'} width={'100%'} height={'auto'} alignItems={'center'} justifyContent={'center'} bg={'red.200'} color="white" paddingY={'1rem'} _hover={{ bg: 'blue.500' }}
                    onClick={() => {
                      localStorage.removeItem('user')
                      localStorage.removeItem('token')
                      dispatch(userSlice.actions.deleteUser())
                      dispatch(api.util.resetApiState())
                      navigate('/')
                    }}
                  >
                      Loggout <WarningTwoIcon mx={2} />
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </>
        }
      </Flex>

      <Collapse in={categoriesAreOpen} animateOpacity>
        <Center
          py={10}
          flexDir={'column'}
          justifyContent={'initial'}
          overflow={'scroll'} fontSize={'1rem'}
          fontWeight={'bold'} minHeight={categoriesAreOpen ? '100vh' : '100vh'}
          display={['flex', 'flex', 'none', 'none']}
        >
          {/* <Link to={'/about'}>
            <Flex alignItems="center"  mr={6} color="white" marginTop={'3rem'} marginBottom={'1rem'}>
              Abouts
            </Flex>
          </Link> */}
          <Link to={'/'}>
            <Flex mr={6} color="white" fontWeight={'bold'} px={10} py={5} _hover={{ bg: 'gray.500' }}
              onClick={() => {
                categoriesAreOpen ? openCategories() : null
                categoriesAreOpen2 ? openCategories2() : null
              }}
            >
              Home
            </Flex>
          </Link>
          <Flex
            mr={6}
            color="white"
            fontWeight={'bold'}
            px={10}
            py={5}
            _hover={{ bg: 'gray.500' }}
            onClick={openCategories2}
          >
            Categories <ChevronDownIcon />
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
          <Link to={'/sales/search'}>
            <Flex mr={6} color="white" fontWeight={'bold'} px={10} py={5} _hover={{ bg: 'gray.500' }}
              onClick={() => {
                categoriesAreOpen ? openCategories() : null
                categoriesAreOpen2 ? openCategories2() : null
              }}
            >
            Track sale
            </Flex>
          </Link>
          {/* <Link to={'/contact'}>
            <Flex alignItems="center"  mr={6} color="white" marginTop={'3rem'} marginBottom={'1rem'}>
              Contact
            </Flex>
          </Link> */}
          { !user && <>
            <Link to={'/login'}>
              <Flex mr={6} color="white" fontWeight={'bold'} px={10} py={5} _hover={{ bg: 'gray.500' }}
                onClick={() => {
                  categoriesAreOpen ? openCategories() : null
                  categoriesAreOpen2 ? openCategories2() : null
                }}
              >
              Logind
              </Flex>
            </Link>
          </>}
        </Center>
      </Collapse>
    </Box >

    {/* Categories popover for big screen  */}
    <Box px={10} width={'100%'} maxWidth={'1200px'} display={['none', 'none', 'block', 'block']}paddingTop={'0.5rem'} paddingBottom={'0'}>
      <Flex paddingBottom={0} alignItems="center" justifyContent="space-between">
        <Box
          position={'relative'}
          role='group'
          width={'25%'}
          zIndex={1}
        >
          <Flex
            color="white"
            fontWeight={'bold'}
            px={2}
            py={2}
            transition={'0.25s'}
            _hover={{ bg: 'gray.500' }}
            role='data-peer'
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            Categories
            <Icon as ={ChevronDownIcon} />
          </Flex>
          <Box
            position={'absolute'}
            border={'1px solid'}
            width={'100%'}
            zIndex={2}
            height={'auto'}
            maxHeight={'0px'}
            bg={'blackAlpha.900'}
            opacity={1}
            visibility={'hidden'}
            transitionDuration={'0.1s'}
            transitionTimingFunction={'ease'}
            transitionProperty={'max-height, visibility'}
            _hover={{ maxHeight:'1000px', visibility:'visible' }}
            _groupHover={{ maxHeight:'250px', visibility:'visible' }}
          >
            {
              isFetchingCategories ?
                <Spinner /> :
                categories ? categories.map((categorie) => (
                  <Link to={`/products/category/${categorie.name}`} key={categorie._id}>
                    <Flex color="white" padding={'1rem'}  _hover={{ bg: 'gray.500' }}>
                      {categorie.name}
                    </Flex>
                  </Link>
                )) : null

            }
          </Box>
        </Box>
        <Spacer />
        <Link to={'/sales/search'}>
          <Flex mr={6} color="white" fontWeight={'bold'} px={10} py={2} _hover={{ bg: 'gray.500' }}>
            Track sale
          </Flex>
        </Link>
        <Spacer />
      </Flex>
    </Box >

  </Flex>

  )
}

export default Navbar
