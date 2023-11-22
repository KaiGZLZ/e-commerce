export function isUser(user: User | undefined | null): User | null {

  if (user && user._id && user.username && user.firstname && user.lastname && user.email && user.role) {
    return {
      _id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    }
  }

  return null
}

export function parseLocarstorageUser(): User | null {

  const user = localStorage.getItem('user')

  if(!user) return null

  try {
    const userParsed = JSON.parse(user)
    if (userParsed && userParsed._id && userParsed.username && userParsed.firstname && userParsed.lastname && userParsed.email && userParsed.role) {
      return {
        _id: userParsed._id,
        username: userParsed.username,
        firstname: userParsed.firstname,
        lastname: userParsed.lastname,
        email: userParsed.email,
        role: userParsed.role,
      }
    } else{
      localStorage.removeItem('user')
      return null
    }
  } catch (error) {
    return null
  }
}