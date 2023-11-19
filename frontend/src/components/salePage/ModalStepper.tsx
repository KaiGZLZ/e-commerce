import React from 'react'
import { Box, ModalHeader, Modal, ModalContent, ModalCloseButton, ModalBody, ModalOverlay, ModalFooter, Button, Stepper, StepIndicator, StepIcon, StepStatus, Step, StepNumber, StepTitle, StepSeparator, useSteps } from '@chakra-ui/react'


function ModalStepper({ isOpen, onClose, index }: { isOpen: boolean, onClose: () => void, index: number}) {

  const steps = [
    { title: ['Waiting for the payment', 'Payment done'] },
    { title: ['Pending confirmation of the payment', 'Payment confirmed'] },
    { title: ['Preparing the product to be shipped', 'Product Sent'] },
    { title: ['Product on the road', 'Product received'] },
  ]

  const { activeStep } = useSteps({
    index: index-1,
    count: steps.length,
  })

  return <>

    {/* Modal Stepper */}
    <Modal onClose={onClose} size={'lg'} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Purchase status</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

          <Stepper index={activeStep} orientation='vertical' height='400px' gap='0' colorScheme={'green'}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box flexShrink='0'>
                  <StepTitle>{(activeStep <= index) ? step.title[0] : step.title[1]}</StepTitle>
                </Box>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

  </>
}

export default ModalStepper