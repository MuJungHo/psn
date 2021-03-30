export const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email)
}

export const validateAccount = account => {
  const re = /^[a-zA-Z0-9]+$/
  return re.test(account)
}

export const validatePassword = password => {
  const re = /^[a-zA-Z0-9]+$/
  return re.test(password)
}