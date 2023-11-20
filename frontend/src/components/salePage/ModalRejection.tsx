import React from 'react'
import { Button, FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import { ModalHeader, Modal, ModalContent, ModalCloseButton, ModalBody, ModalOverlay, ModalFooter } from '@chakra-ui/react'

import { useAdminPaymentRejectionMutation } from '../../services/sale.service'
import { useDispatch } from 'react-redux'
import { alertSlice } from '../../redux/slices/alertSlice'
import { useForm } from 'react-hook-form'


type formType = {
  saleId: string
  rejectionReason: string
}


function ModalRejection({ isOpen, onClose, sale, refetch }: { isOpen: boolean, onClose: () => void, sale: Sale | undefined, refetch: () => void }) {
  const dispatch = useDispatch()

  const [adminPaymentRejection, { isLoading }] = useAdminPaymentRejectionMutation()

  const { register, handleSubmit, formState: { errors } } = useForm<formType>()

  const onSubmit = (formData: formType) => {

    if (!sale) return

    formData.saleId = sale?._id

    adminPaymentRejection(formData)
      .unwrap()
      .then(() => {
        dispatch(alertSlice.actions.setAlert({ status: 'success', title: 'Error', message: 'Payment confirmation sent' }))
        refetch()
        onClose()
      })
      .catch((err) => {
        dispatch(alertSlice.actions.setAlert(err))
        onClose()
      })

  }

  return <>

    {/* Modal user payment confirmation */}
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reject a payment</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mb={4}>
            <FormLabel>Rejection reason </FormLabel>
            <Textarea {...register('rejectionReason', { required: 'The feedback is required' })} placeholder='Provide feedback' />
            {errors.rejectionReason && <span style={{ color: 'red' }}>{errors.rejectionReason?.message?.toString()}</span>}
          </FormControl>
        </ModalBody>
        <ModalFooter justifyContent={'space-between'}>
          <Button onClick={onClose}>Cancel</Button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Button  colorScheme='blue' mr={3} type='submit'
              isDisabled={!sale}
              isLoading={isLoading}
              loadingText='Saving...'
            >
              Save
            </Button>
          </form>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}

export default ModalRejection