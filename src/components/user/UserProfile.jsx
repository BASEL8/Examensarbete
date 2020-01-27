import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { isAuth } from '../../actions/auth'
import Main from './profile/main'
const UserProfile = () => {
  const history = useHistory()
  useEffect(() => {
    if (!isAuth()) {
      return history.push('/')
    }
  }, [history])
  return (
    <Main />
  )
}
export default UserProfile;