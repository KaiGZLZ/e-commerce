import React from 'react'
import { Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react'
import { ModalHeader, Modal, ModalContent, ModalCloseButton, ModalBody, ModalOverlay, ModalFooter } from '@chakra-ui/react'

import CartFloatButton from '../../components/CartFloatButton'
import { useAdminPaymentConfirmationMutation, useUserPaymentConfirmationMutation } from '../../services/sale.service'
import { useDispatch } from 'react-redux'
import { alertSlice } from '../../redux/slices/alertSlice'
import { useForm } from 'react-hook-form'
import salesEnum from '../../enums/sales.enum'
import { parseLocarstorageUser } from '../../__helpers/isUser'
import userEnum from '../../enums/user.enum'


type userPaymentConfirmationType = {
  saleId: string | undefined
  paymentMethod: string
  paymentReference: string
  paymentDate: string
}


function ModalPaymentConfirmation({ isOpen, onClose, sale, refetch }: { isOpen: boolean, onClose: () => void, sale: Sale | undefined, refetch: () => void }) {
  const dispatch = useDispatch()

  const user = parseLocarstorageUser()

  // Modal user payment confirmation
  const [userPaymentConfirmation, { isLoading: isLoadingUserPaymentConfirmation }] = useUserPaymentConfirmationMutation()
  const [adminPaymentConfirmation, { isLoading: isLoadingAdminPaymentConfirmation }] = useAdminPaymentConfirmationMutation()


  const { register, handleSubmit, formState: { errors } } = useForm<userPaymentConfirmationType>()

  const onSubmit = (formData: userPaymentConfirmationType) => {

    formData.saleId = sale?._id

    if (user && user.role === userEnum.role.admin) {
      adminPaymentConfirmation(formData)
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
    else{
      userPaymentConfirmation(formData)
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
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mb={4}>
            <FormLabel>Payment Method </FormLabel>
            <Select {...register('paymentMethod', { required: 'The payment method is required' })} placeholder='Select payment method' defaultValue={sale?.paymentMethod}>
              {
                Object.keys(salesEnum.paymentMethodDescription).map((key) => {
                  return <option key={key} value={key}>{salesEnum.paymentMethodDescription[Number(key)]}</option>
                })
              }
            </Select>
            {errors.paymentMethod && <span style={{ color: 'red' }}>{errors.paymentMethod?.message?.toString()}</span>}
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Payment Reference </FormLabel>
            <Input {...register('paymentReference', { required: 'The payment reference is required' })} placeholder='Payment Reference' defaultValue={sale?.paymentReference} />
            {errors.paymentReference && <span style={{ color: 'red' }}>{errors.paymentReference?.message?.toString()}</span>}
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Payment Date </FormLabel>
            <Input {...register('paymentDate', { required: 'The payment date is required' })} placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
              defaultValue={sale?.paymentDate ?  new Date(sale?.paymentDate).toISOString().slice(0, 16) : ''}
            />
            {errors.paymentDate && <span style={{ color: 'red' }}>{errors.paymentDate?.message?.toString()}</span>}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Button  colorScheme='blue' mr={3} type='submit'
              isDisabled={!sale}
              isLoading={isLoadingAdminPaymentConfirmation || isLoadingUserPaymentConfirmation}
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

export default ModalPaymentConfirmation