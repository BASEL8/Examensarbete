import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { isAuth } from '../../actions/auth'
import Main from './profile/main'
const UserProfile = () => {
  const history = useHistory()
  const [user, setUser] = useState(isAuth())
  useEffect(() => {
    if (!isAuth()) {
      return history.push('/')
    }
    setUser(isAuth())
  }, [history])
  return (
    <Main user={user} />
  )
}
export default UserProfile;