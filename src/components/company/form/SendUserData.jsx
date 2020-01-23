import React, { useEffect, useState } from 'react';
import { updateCompanyProfile } from '../../../actions/companyAuth'
import { getCookie, isAuth, setLocalStorage } from '../../../actions/auth'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom'
const SendUserData = ({ setError, setActiveStep, userData }) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let token = getCookie('token')
    updateCompanyProfile(token, userData).then(res => {
      if (res.error) {
        setActiveStep(2)
        return setError(res.error)
      } else {
        setLoading(false)
        setLocalStorage('user', res)
      }
    })
  }, [setActiveStep, setError, userData])
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {loading ?
        <CircularProgress /> :
        <>
          <p>your profile is ready, don't forget to publish it!</p>
          <p> <Link to={`/company/profile/${isAuth()._id}`}> Profile</Link></p>
        </>
      }
    </div>
  )
}
export default SendUserData;