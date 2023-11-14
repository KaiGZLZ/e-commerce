interface _user {
    _id: ObjectId | string
    username: string
    firstname: string
    lastname: string
    email: string
    password: string
    role: number
    accountStatus: boolean
    activationToken: string | undefined
    recoverPasswordToken: string | undefined
    tries: number | undefined
}
