import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { isAuth, getCookie } from '../../actions/auth'
import { getUserProfile } from '../../actions/userAuth'
import NotCompleteProfile from './NotCompleteProfile'

const UserProfile = () => {
  const history = useHistory()
  const { _id } = useParams()
  const [user, setUser] = useState({ error: '', })
  useEffect(() => {
    if (!isAuth) {
      return history.push('/')
    }
    getUserProfile(getCookie('token'), isAuth()._id).then(res => {
      if (res.error) {
        return setUser({ ...user, error: res.error })
      }
      setUser({ ...res, error: '' })
    })
    // eslint-disable-next-line
  }, [_id])
  return (
    !user.profileComplete ?
      <NotCompleteProfile user={user} />
      :
      <p> user main profile</p>
  )
}
export default UserProfile;