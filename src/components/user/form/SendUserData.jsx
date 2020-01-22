import React, { useEffect, useState } from 'react';
import { updateUserProfile } from '../../../actions/userAuth'
import { getCookie, isAuth, authenticate } from '../../../actions/auth'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom'
const SendUserData = ({ userData, setError, setActiveStep }) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let token = getCookie('token')
    updateUserProfile(token, userData).then(res => {
      if (res.error) {
        setActiveStep(3)
        return setError(res.error)
      } else {
        setLoading(false)
      }
    })
  }, [setActiveStep, setError, userData])
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {loading ?
        <CircularProgress /> :
        <>
          <p>your profile is ready, don't forget to publish it!</p>
          <p> <Link to={`/user/profile/${isAuth()._id}`}> Profile</Link></p>
        </>
      }
    </div>
  )
}
export default SendUserData;
