
/**
 * @param {string} url - url to redirect, to make the activation of the account
 * @param {string} token - token to make the activation of the account
 */
export function activateAccountMail(url: string | undefined, token: string){

    if (!url || ! token){
        throw('Error sendindg the ToDoList Confirmation Email')
    }

    return`<p><strong>Please</strong> <a href="${url + "#" + token}">Click here!</a> to recover your password</p>`
}

/**
 * @param {string} url - url to redirect, to make the change of the password
 * @param {string} token - token to make the change of the password
 */
export function recoverPasswordMail(url: string, token: string){

    if (!url || ! token){
        throw('Error sendindg the ToDoList Confirmation Email')
    }

    return`<p><strong>Please</strong> <a href="${url + "#" + token}">Click here!</a> to recover your password</p>`
}