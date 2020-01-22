import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { isAuth } from '../../actions/auth'
import Main from './profile/main'
const UserProfile = () => {
  const history = useHistory()
  const { _id } = useParams()
  const [user, setUser] = useState(isAuth())
  useEffect(() => {
    if (!isAuth()) {
      return history.push('/')
    }
    setUser(isAuth())
  }, [history])
  console.log('called')
  return (
    <Main user={user} />
  )
}
export default UserProfile;