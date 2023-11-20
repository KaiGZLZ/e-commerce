import React from 'react'
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { ModalHeader, Modal, ModalContent, ModalCloseButton, ModalBody, ModalOverlay, ModalFooter } from '@chakra-ui/react'

import CartFloatButton from '../CartFloatButton'
import { useSentPackageMutation } from '../../services/sale.service'
import { useDispatch } from 'react-redux'
import { alertSlice } from '../../redux/slices/alertSlice'
import { useForm } from 'react-hook-form'
import { parseLocarstorageUser } from '../../__helpers/isUser'
import userEnum from '../../enums/user.enum'


type formType = {
  saleId: string
  trackingCode: string
}


function ModalSentPackage({ isOpen, onClose, sale, refetch }: { isOpen: boolean, onClose: () => void, sale: Sale | undefined, refetch: () => void }) {
  const dispatch = useDispatch()

  const user = parseLocarstorageUser()

  const [sentPackageMutation, { isLoading }] = useSentPackageMutation()

  const { register, handleSubmit, formState: { errors } } = useForm<formType>()

  const onSubmit = (formData: formType) => {

    if (!sale) return

    formData.saleId = sale?._id

    if (user && user.role === userEnum.role.admin) {
      sentPackageMutation(formData)
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
  }

  return <>

    {/* Moda user payment confirmation */}
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sent package</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mb={4}>
            <FormLabel>Tracking code </FormLabel>
            <Input {...register('trackingCode', { required: 'The tracking code is required' })} placeholder='Write the tranking code' />
            {errors.trackingCode && <span style={{ color: 'red' }}>{errors.trackingCode?.message?.toString()}</span>}
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

    {/* Cart Float Button */}
    <CartFloatButton />

  </>
}

export default ModalSentPackage