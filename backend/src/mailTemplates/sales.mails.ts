/**
 * @param {string} url - url to redirect, to make the activation of the account
 * @param {string} order - sales order number
 */
export function saleRegisterMail(url: string | undefined, order: string): string {
    return `<p><strong>Thanks for buying. If you want to see the purchase, please </strong> <a href="${url + order}">Click here!</a> watch all the details</p>
    <p><strong>Your order number is: ${order}, and you can always watch the status of the your order in this  <a href="${url + order}">Link</a> </strong> or putting the order number in our web page checker</p>
    
    <p><strong> IMPORTANT!!: You just have 24 hours to make the payment in the web page, otherwise the order will be canceled </strong></p>

    <p><strong> If you have any question, please contact us in our social media or in our contact page </strong></p>

    <p><strong> Here are the detail for the payment: </strong></p>
    
    <p><strong> Paypal: </strong> mail@mail.com</p>

    <p><strong> Zelle: </strong> 123456789</p>

    <p> Once you have made the payment, please respond to this email with an screenshot or a receipt of the payment or you can report the payment in the next link: <a href="${url + order}"> Report Payment</a> </p>

    <p><strong> If you have any question, please contact us in our social media or in our contact page </strong></p>

    <p><strong> Thanks for your purchase!! </strong></p>   
    `
}
