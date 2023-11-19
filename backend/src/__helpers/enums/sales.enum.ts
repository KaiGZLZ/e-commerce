export default {

    status: {
        canceled: 0,
        pendingPayment: 1,
        pendingConfirmation: 2,
        preparing: 3,
        onTheRoad: 4,
        received: 5

    },

    statusDescription: {
        0: 'Canceled',
        1: 'Pending payment',
        2: 'Pending confirmation',
        3: 'Preparing',
        4: 'On the road',
        5: 'Received'
    }
}
