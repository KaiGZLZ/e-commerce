export default {

    status: {
        canceled: 0,
        pendingPayment: 1,
        pendingConfirmation: 2,
        confirmed: 3,
        sent: 4,
        received: 5

    },

    statusDescription: {
        0: 'Canceled',
        1: 'Pending payment',
        2: 'Pending confirmation',
        3: 'Confirmed',
        4: 'Product Sent',
        5: 'Received'
    }
}
