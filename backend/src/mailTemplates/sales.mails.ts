/**
 * @param {string} url - url to redirect, to make the activation of the account
 * @param {string} token - token to make the activation of the account
 */
export function saleDelailsMail(url: string | undefined, token: string): string {
    return `<p><strong>Thanks for buying. If you want to see the purchase, please </strong> <a href="${url + '#' + token}">Click here!</a> watch all the details</p>`
}
