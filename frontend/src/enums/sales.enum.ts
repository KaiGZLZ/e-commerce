
type Description = {
  [key: number]: string;
};

export default {

  status: {
    pendingPayment: 1,
    pendingConfirmation: 2,
    preparing: 3,
    onTheRoad: 4,
    received: 5,
    canceled: 6,

  },

  statusDescription: {
    1: 'Pending payment',
    2: 'Pending confirmation',
    3: 'Preparing',
    4: 'On the road',
    5: 'Received',
    6: 'Canceled'
  } as Description,

  paymentMethod: {
    paypal: 0,
    creditCard: 1,
    transfer: 2,
    cash: 3
  },

  paymentMethodDescription: {
    0: 'Paypal',
    1: 'Credit card',
    2: 'Transfer',
    3: 'Cash'
  } as Description,
}
