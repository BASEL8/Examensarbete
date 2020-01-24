import React, { useEffect, useState } from 'react';
import { updateCompanyProfile } from '../../../actions/companyAuth'
import { getCookie } from '../../../actions/auth'
import CircularProgress from '@material-ui/core/CircularProgress';
const SendUserData = ({ setError, setActiveStep, userData }) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let token = getCookie('token')
    updateCompanyProfile(token, userData).then(res => {
      if (res.error) {
        setActiveStep(2)
        return setError(res.error)
      }
      setActiveStep(2)
      setError('')
    })
  }, [setActiveStep, setError, userData])
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress /> :
    </div>
  )
}
export default SendUserData;