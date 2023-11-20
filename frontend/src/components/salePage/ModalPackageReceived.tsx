import React from 'react'
import { Button, FormControl, FormLabel, Select, Textarea } from '@chakra-ui/react'
import { ModalHeader, Modal, ModalContent, ModalCloseButton, ModalBody, ModalOverlay, ModalFooter } from '@chakra-ui/react'

import CartFloatButton from '../../components/CartFloatButton'
import { usePackageReceivedMutation } from '../../services/sale.service'
import { useDispatch } from 'react-redux'
import { alertSlice } from '../../redux/slices/alertSlice'
import { useForm } from 'react-hook-form'

type packageReceivedType = {
  saleId: string
  rating: number
  comment: string
}


function ModalPackageReceived({ isOpen, onClose, sale, refetch }: { isOpen: boolean, onClose: () => void, sale: Sale | undefined, refetch: () => void }) {
  const dispatch = useDispatch()

  const [packageReceivedMutation, { isLoading }] = usePackageReceivedMutation()

  const { register, handleSubmit, formState: { errors } } = useForm<packageReceivedType>()

  const onSubmit = (formData: packageReceivedType) => {

    if (!sale) return

    formData.saleId = sale?._id

    packageReceivedMutation(formData)
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

    {/* Moda user payment confirmation */}
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Please provide your feedback</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mb={4}>
            <FormLabel>Payment Method </FormLabel>
            <Select {...register('rating')} placeholder='Rate the product'>
              {
                [1,2,3,4,5].map((key) => {
                  return <option key={key} value={key}>{key}</option>
                })
              }
            </Select>
            {errors.rating && <span style={{ color: 'red' }}>{errors.rating?.message?.toString()}</span>}
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Payment Reference </FormLabel>
            <Textarea {...register('comment')} placeholder='Add your comment (Optional)' />
            {errors.comment && <span style={{ color: 'red' }}>{errors.comment?.message?.toString()}</span>}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Button  colorScheme='blue' mr={3} type='submit'
              isDisabled={!sale}
              isLoading={isLoading}
              loadingText='Saving...'
            >
              Save
            </Button>
          </form>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

    {/* Cart Float Button */}
    <CartFloatButton />

  </>
}

export default ModalPackageReceived