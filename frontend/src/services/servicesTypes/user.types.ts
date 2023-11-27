export type SimpleResponse = {
    message: string
  }

export type RegisterUserType = {
    username: string
    firstname: string
    lastname: string
    password: string
    passwordConfirmation: string
    email: string
  }

export type AuthenticationUserType = {
    token: string
  }

export type GetUserType = {
    result: User
    message: string
  }

export type UpdateDataType ={
    username: string
    firstname: string
    lastname: string
    email: string
    role: number | undefined;
    userId: string
  };

export type LoginUserType = {
    username: string
    password: string
  }

export type LoginUserTypeSuccess = {
    user: User
    token: string
    message: string
  }