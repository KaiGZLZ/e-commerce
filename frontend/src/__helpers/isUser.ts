export function isUser(user: user | undefined | null): user | null {

  if (user && user.username && user.firstname && user.lastname && user.email && user.role) {
    return {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    }
  }

  return null
}

export function parseLocarstorageUser(): user | null {

  const user = localStorage.getItem('user')

  if(!user) return null

  try {
    const userParsed = JSON.parse(user)
    if (userParsed && userParsed.username && userParsed.firstname && userParsed.lastname && userParsed.email && userParsed.role) {
      return {
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