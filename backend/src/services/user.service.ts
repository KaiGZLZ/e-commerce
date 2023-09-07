
import bcrypt from 'bcryptjs' 
import jsonwebtoken from 'jsonwebtoken' 

import config from '../config'
import User from '../Models/user.model'

import sendMail from '../__helpers/sendEmail';
import { activateAccountMail } from '../mails/user.mail';

/**
 * Funtion to register an user
 * 
 * @param {object} data
 * @param {string} data.firstname - Users firstname
 * @param {string} data.lastname - Users lastname
 * @param {string} data.username - Users username
 * @param {string} data.password - Users password
 * @param {string} data.email - Users email
 * 
 */
export async function userRegister(data: any) {

    const user = data.user;

    // Look if there is a user with the same name
    let existingUser = await User.findOne({ username: user.username });

    if (existingUser) throw ('Already exists this username');

    // Look if there is an user with the same email
    existingUser = await User.findOne({ email: user.email });

    if (existingUser) throw ('The email was already used by ' + existingUser.username);

    // If not, Register the new user


    let encryptedPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    user.password = encryptedPassword;

    let activationToken = bcrypt.hashSync(new Date().toString() + user.password + config.SECRET, bcrypt.genSaltSync(10));
    user.activationToken = activationToken;

    const newUser = new User(user)
    await newUser.save()

    // The confirmation email will be sent 

    let subject = "ToDoList Confirmation Email";
    let text = "To confirm the email";
    let html = activateAccountMail(process.env.URL_CONFIRMATION_EMAIL, activationToken);

    try {
        await sendMail(user.email, subject, text, html);
    }
    catch (e) {
        throw (e)
    }

    return {
        description: "User added successfully",
    }
}


/** Funtion to Delete an user
 * 
 * @param {object} data
 * @param {string} data.user - username
 * @param {string} data.user - password
 * 
 */
export async function userDelete(data: any) {

    const passwordUsernameToDelete = data.password;

    let result = bcrypt.compareSync(passwordUsernameToDelete, data._user.password);

    if (result) {

        await User.findOneAndDelete({ username: data._user.username })

        return {
            result: true,
            description: 'User deleted successfully',
        }
    }
    else {
        return {
            result: false,
            description: 'Password is incorrect',
        }
    }
}

/**
 * Funtion to login an user
 * 
 * @param {object} data - 
 * @param {string} data.user - Users username
 * @param {string} data.user - Users password
 * 
 */
export async function userLogin(data: any) {

    const userRequested = data.userRequested;

    const user = await User.findOne({ username: userRequested.username })

    if (!user) throw ('There is a problem with the username or the password');

    if (!user.accountStatus) throw ('You must activate your account');


    let result = bcrypt.compareSync(userRequested.password, user.password);

    if (result) {
        const token = jsonwebtoken.sign({ sub: user.id }, config.SECRET, { expiresIn: 60 * 60 }); // Expiration time: 1h

        return {
            user: {
                ...user.toJSON(),
                token,
            },
        };
    }
    else throw ('There is a problem with the username or the password');
}


/** Funtion to authenticate the email from an user
 * 
 * @param {object} data - 
 * @param {string} data.user - Users username
 * @param {string} data.user - Users password
 * 
 */
export async function userAuthenticate(data: any) {

    const activationToken = data.token;

    const user = await User.findOne({ activationToken: activationToken })

    if (!user) {
        throw ('Invalid activation token')
    }
    else {
        if (user.accountStatus === true) {
            throw ('Your account was already activated. Please Loggin normally')
        }
    }

    user.accountStatus = true;
    user.activationToken = "";

    const userSaved = await user.save();

    const token = jsonwebtoken.sign({ sub: userSaved.id }, config.SECRET, { expiresIn: 60 * 60 }); // Expiration time: 1h

    return {
        user: {
            ...user.toJSON(),
            token,
        },
    };
}


/** Funtion to send an recovery email if the password was forgotten
 * 
 * @param {object} data - 
 * @param {string} data.email - User email
 * 
 */
export async function sendRecoveryEmail(data: any) {

    const email = data.data.email;

    const user = await User.findOne({ email: email })

    if (!user) throw ('No user is registered with this email');


    let recoverPasswordToken = bcrypt.hashSync(new Date().toString() + user.password + config.SECRET, bcrypt.genSaltSync(10));

    user.recoverPasswordToken = recoverPasswordToken;

    await user.save()


    // The email will be sent with the link to recover the password

    let subject = "ToDoList Recover Password";
    let text = "To confirm the email";
    let html = activateAccountMail(process.env.URL_RECOVER_PASSWORD, recoverPasswordToken);

    try {
        await sendMail(user.email, subject, text, html);
    }
    catch (e) {
        throw (e)
    }
}

/**
 * Funtion to change the user password
 * 
 * @param {object} data - 
 * @param {string} data.token - Users username
 * @param {string} data.password - Users password
 * 
 */
export async function userChangePassword(data: any) {

    const recoverPasswordToken = data.data.token;
    const password = data.data.password;

    const user = await User.findOne({ recoverPasswordToken: recoverPasswordToken })

    if (!user) {
        throw ('Invalid activation token')
    }

    let result = bcrypt.compareSync(password, user.password);

    if (result) {
        throw ('The password cannot be the same as the one passed');
    }

    let encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    user.password = encryptedPassword;

    user.recoverPasswordToken = "";

    await user.save();

    return {
        message: "The password was changed successfully"
    };
}

