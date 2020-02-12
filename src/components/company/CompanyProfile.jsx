import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { isAuth } from '../../actions/auth'
import Main from './profile/Main'
const CompanyProfile = () => {
  const history = useHistory()
  const [user, setUser] = useState(isAuth())
  useEffect(() => {
    if (!isAuth()) {
      return history.push('/')
    }
    setUser(isAuth())
  }, [history])
  return (
    <div>
      <Main user={user} />
    </div>
  )
}
export default CompanyProfile;