import React from 'react'
import { Flex, Tabs, TabList, Tab, TabPanels, TabPanel, Box, Button, Image } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useState } from 'react'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  }
}

function PrincipalTabs({ images = [] as string[], images2 = [] as string[] }) {

  return (<Flex flexDirection={'column'} width={'100%'} maxWidth={'1200px'}>
    <Tabs variant='unstyled'>
      <TabList justifyContent={'center'}>
        <Tab
          fontSize={['30px', '30px', '40px', '40px']}
          fontWeight={'bold'}
          _hover={{ color: '#fcb941' }}
          color={'blackAlpha.800'}
          rounded={'20%'}
          _active={{ background: 'rgba(0, 0, 0, 0.05)' }}
          _selected={{ boxShadow: 'md', color: '#e3ac49' }}
        >
          Featured
        </Tab>
        <Tab
          fontSize={['30px', '30px', '40px', '40px']}
          fontWeight={'bold'}
          _hover={{ color: '#fcb941' }}
          color={'blackAlpha.800'}
          rounded={'20%'}
          _active={{ background: 'rgba(0, 0, 0, 0.05)' }}
          _selected={{ boxShadow: 'md', color: '#e3ac49' }}
        >
          Offers
        </Tab>
      </TabList>
      <TabPanels>
        <Carrousel2 images={images} />
        <Carrousel2 images={images2} />
      </TabPanels>
    </Tabs>
  </Flex>

  )
}

export default PrincipalTabs


function Carrousel2({ images = [] as string[] }) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handlePreviousClick = () => {

    const { width } = getWindowDimensions()

    const offset = (width >= 992) ? 3 : (width >= 768) ? 2 : 1

    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 - offset : prevIndex - 1
    )
  }

  const handleNextClick = () => {

    const { width } = getWindowDimensions()

    const offset = (width >= 992) ? 3 : (width >= 768) ? 2 : 1

    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 - offset ? 0 : prevIndex + 1
    )
  }

  return (
    <TabPanel>
      <Box position="relative" overflow={'hidden'}>
        <Box
          display="flex"
          transition="transform 0.4s"
          transform={[`translateX(-${currentImageIndex * 100}%)`, `translateX(-${currentImageIndex * 100 / 2}%)`, `translateX(-${currentImageIndex * 100 / 3}%)`, `translateX(-${currentImageIndex * 100 / 4}%)`]}
          justifyContent={'space-between'}
          gap={['2%', '2%', '1%', '1%']}
        >
          {images.map((image, index) => (
            <Flex key={index} justifyContent={'center'} alignItems={'center'} flexShrink={0} width={['100%', '48%', '32%', '24%']} maxHeight={'144px'}>
              <Image
                src={image}
                alt={`Carousel Image ${index + 1}`}
                maxHeight= {'144px'}
                maxWidth= '100%'
                objectFit= 'contain'
              />
            </Flex>
          ))}
        </Box>
        <Button
          position="absolute"
          bg={'rgba(255, 255, 255, 0.1)'}
          top="50%"
          left={0}
          transform="translateY(-50%)"
          onClick={handlePreviousClick}
          disabled={currentImageIndex === 0}
          leftIcon={<ChevronLeftIcon />}
        />
        <Button
          position="absolute"
          bg={'rgba(255, 255, 255, 0.1)'}
          top="50%"
          right={0}
          transform="translateY(-50%)"
          onClick={handleNextClick}
          disabled={currentImageIndex === images.length - 1}
          rightIcon={<ChevronRightIcon />}
        />
        <Box
          position="absolute"
          bottom="3%"
          left="50%"
          transform="translateX(-50%)"
          display="flex"
          justifyContent="center"
        >
          {images.filter((_, index, array) => {

            const { width } = getWindowDimensions()

            const offset = (width >= 992) ? 3 : (width >= 768) ? 2 : 1

            const finalLength = array.length - offset

            return index < finalLength

          }).map((_, index) => (
            <Box
              key={index}
              mx="1"
              p="0"
              width={['20px', '20px', '30px', '30px']}
              height="10px"
              borderRadius="20%"
              backgroundColor={index === currentImageIndex ? 'blue.500' : 'gray.200'}
              cursor={'pointer'}
              _hover={{ backgroundColor: 'blue.500' }}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </Box>
      </Box>
    </TabPanel>
  )
}

