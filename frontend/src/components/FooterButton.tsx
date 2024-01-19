import React from 'react'
import { IconButton } from '@chakra-ui/react'
import { IconType } from 'react-icons'

function FooterButton({ Icon, text, href }: {Icon: IconType, text: string, href: string}) {
  return(
    <IconButton
      colorScheme="white"
      aria-label="Linkedin"
      icon={<Icon size={20} />}
      isRound={true}
      size={'md'}
      variant="outline"
      _hover={{
        bg: 'white',
        color: 'black',
        _after: {
          display: 'flex'
        }

      }}
      _focus={{ boxShadow: 'none' }}
      _after={{
        content: `'${text}'`,
        position: 'absolute',
        display: 'none',
        transition: 'display 0.3s ease-in-out',
        top: '130%',
        left: '50%',
        transform: 'translateX(-50%)',
        height: '20px',
        borderRadius: '10%',
        paddingX: '5px',
        backgroundColor: 'red',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        zIndex: 1,
      }}

      as={'a'}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    />
  )
}

export default FooterButton