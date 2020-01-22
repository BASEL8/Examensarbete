import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { isAuth, getCookie } from '../../actions/auth'
import { getUserProfile } from '../../actions/userAuth'
import Main from './profile/main'
const UserProfile = () => {
  const history = useHistory()
  const { _id } = useParams()
  const [user, setUser] = useState(isAuth())
  useEffect(() => {
    if (!isAuth()) {
      return history.push('/')
    }
  }, [history])
  return (
    <Main user={user} />
  )
}
export default UserProfile;