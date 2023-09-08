/**
 * @param {string} url - url to redirect, to make the activation of the account
 * @param {string} token - token to make the activation of the account
 */
export function activateAccountMail(url: string | undefined, token: string): string {
    if (!url || !token) {
        throw new Error('Error sendindg the ToDoList Confirmation Email')
    }

    return `<p><strong>Please</strong> <a href="${url + '#' + token}">Click here!</a> to activate your account</p>`
}

/**
 * @param {string} url - url to redirect, to make the change of the password
 * @param {string} token - token to make the change of the password
 */
export function recoverPasswordMail(url: string, token: string | undefined): string {
    if (!url || !token) {
        throw new Error('Error sendindg the ToDoList Confirmation Email')
    }

    return `<p><strong>Please</strong> <a href="${url + '#' + token}">Click here!</a> to recover your password</p>`
}
