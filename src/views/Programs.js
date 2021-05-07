import React from 'react'
export default () => {
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      localStorage.setItem('login_udid', getCookie('login_udid'))
      localStorage.setItem('login_uid', getCookie('login_uid'))
    }
  }, [])
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  return (<>programs</>)
}