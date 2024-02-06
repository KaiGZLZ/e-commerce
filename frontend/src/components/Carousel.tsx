import React from 'react'
import { Box, Button, Flex, Image } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'

const Carousel = ({ images = [] as string[] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const timerRef = React.useRef<NodeJS.Timer | null>(null)

  const handlePreviousClick = (isClick = false) => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )

    if(isClick && timerRef?.current){
      clearInterval(timerRef.current)
    }
  }

  const handleNextClick = (isClick = false) => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
    if(isClick && timerRef?.current){
      clearInterval(timerRef.current)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextClick()
    },3000)

    timerRef.current = timer

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Flex justifyContent={'space-between'} margin={'30px'} maxWidth={'1200px'} flexDir={['column', 'column', 'row', 'row']}>
      <Box width={['100%', '100%', '66.7%', '66.7%']} mx="auto" marginRight={['0','0','10px','10px']} mb={['2rem','2rem','0','0']} >
        <Box position="relative" overflow={'hidden'} >
          <Box
            display="flex"
            transition="transform 0.4s"
            transform={`translateX(-${currentImageIndex * 100}%)`}
          >
            {images.map((image, index) => (
              <Flex alignItems={'center'} justifyContent={'center'} key={index} flexShrink={0} width="100%" maxHeight={'407px'}>
                <img
                  src={image}
                  alt={`Carousel Image ${index + 1}`}
                  style={{ maxHeight: '407px' }}
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
            onClick={() => handlePreviousClick(true)}
            disabled={currentImageIndex === 0}
            leftIcon={<ChevronLeftIcon />}
          />
          <Button
            position="absolute"
            bg={'rgba(255, 255, 255, 0.1)'}
            top="50%"
            right={0}
            transform="translateY(-50%)"
            onClick={() => handleNextClick(true)}
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
            {images.map((_, index) => (
              <Button
                key={index}
                variant="unstyled"
                mx="1"
                p="0"
                width="6px"
                height="10px"
                borderRadius="20%"
                backgroundColor={index === currentImageIndex ? 'blue.500' : 'gray.200'}
                _hover={{ backgroundColor: 'blue.500' }}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <Box width={['100%', '100%', '33.3%', '33.3%']}>
        <Flex direction={'column'} alignItems={'center'}  justifyContent={'space-between'} width={'100%'} height={'100%'} gap={'5px'}>
          <Flex key={1} width={'100%'} mx={'auto'} maxHeight={['', '', '128px', '128px']} justifyContent={'end'} alignItems={'center'} >
            <Image
              src={'https://pczatelca.com/images/slides/banner4.jpg'}
              alt={'Carousel Image'}
              maxHeight={['', '', '128px', '128px']}
              width={['100%', '100%', 'auto', 'auto']}
            />
          </Flex>
          <Flex key={2} width={'100%'} mx={'auto'} maxHeight={['', '', '128px', '128px']} justifyContent={'end'} alignItems={'center'} >
            <Image
              src={'https://pczatelca.com/images/slides/banner1.jpg'}
              alt={'Carousel Image'}
              maxHeight={['', '', '128px', '128px']}
              width={['100%', '100%', 'auto', 'auto']}
            />
          </Flex>
          <Flex key={3} width={'100%'}  mx={'auto'} maxHeight={['', '', '128px', '128px']} justifyContent={'end'} alignItems={'center'} >
            <Image
              src={'https://pczatelca.com/images/slides/banner4.jpg'}
              alt={'Carousel Image'}
              maxHeight={['', '', '128px', '128px']}
              width={['100%', '100%', 'auto', 'auto']}
            />
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Carousel