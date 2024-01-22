import React from 'react'
import { Flex } from '@chakra-ui/react'
import { FaGithub, FaLinkedinIn, FaFilePdf } from 'react-icons/fa'
import FooterButton from './FooterButton'

function FooterComponent() {
  return (

    <Flex
      width={'100%'}
      height={'170px'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      color={'white'}
      bg="blackAlpha.900"
      marginTop={'3rem'}
    >
      <span className="text-muted">Backend and Frontend developed by  <strong>Jesús González</strong></span>

      <Flex
        flexDirection={'row'}
        marginTop={'1rem'}
        gap={'1.55rem'}
      >

        <FooterButton
          Icon={FaLinkedinIn}
          text={'LinkeIn'}
          href='https://www.linkedin.com/in/jesus-alfonso-gonzalez/'
        />

        <FooterButton
          Icon={FaFilePdf}
          text={'CV Jesús González'}
          href='https://drive.google.com/file/d/1n7u_XdkqIs_wSqE39v-j_OaeBz57xgFr/view'
        />

        <FooterButton
          Icon={FaGithub}
          text={'Project repository'}
          href='https://github.com/KaiGZLZ/e-commerce'
        />

      </Flex>

    </Flex>
  )
}

export default FooterComponent