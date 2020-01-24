import React, { useEffect } from 'react';
import { updateUserProfile } from '../../../actions/userAuth'
import { getCookie } from '../../../actions/auth'
import CircularProgress from '@material-ui/core/CircularProgress';
const SendUserData = ({ userData, setError, setActiveStep }) => {
  useEffect(() => {
    let token = getCookie('token')
    updateUserProfile(token, userData).then(res => {
      if (res.error) {
        setActiveStep(3)
        return setError(res.error)
      } else {
        setActiveStep(3)
        setError('')
      }
    })
  }, [setActiveStep, setError, userData])
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress /> :
    </div>
  )
}
export default SendUserData;
