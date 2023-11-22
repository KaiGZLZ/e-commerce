type description = {
  [key: number]: string
}

export default {
  role: {
    admin: 1,
    user: 2
  },

  roleDescription : {
    1: 'Admin',
    2: 'User'
  } as description,
}