
export default function authHeader(){
  //  Retorna el header de autorización con el token jwt
  const token = localStorage.getItem('token')

  if(token){
    return 'Bearer ' + token
  } else {
    return ''
  }
}
