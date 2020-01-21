import React, { useEffect } from 'react';
import { updateUserProfile } from '../../../actions/userAuth'
import { getCookie, isAuth } from '../../../actions/auth'
const SendUserData = ({ userData }) => {
  useEffect(() => {
    let token = getCookie('token')
    updateUserProfile(token, userData).then(res => console.log(res))
  }, [userData])
  return (
    <div>sending</div>
  )
}
export default SendUserData;
