import React, { useState, userEffect, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import AuthIndex from '../AuthIndex'
import { signup } from '../../actions/userAuth'
import { useHistory } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';



const UserActivation = () => {
  const { activationToken } = useParams()
  const history = useHistory()
  const [state, setState] = useState({ error: '', success: '' })
  const { error, success } = state;
  useEffect(() => {
    activationToken && signup(activationToken).then(res => {
      if (res.error) {
        setState({ error: res.error, success: '' })
      }
      else {
        setState({ error: '', success: res.success })
      }
      return setTimeout(() => { history.push('/user/login', { email: res.email }) }, 10000)
    })
  }, [activationToken, history])
  console.log(state)
  return (
    <AuthIndex>{
      <>
        {(!error && !success) && <CircularProgress />}
        {!success ?
          <h4 style={{ textAlign: 'center' }}>{error}, <Link style={{ margin: '0 10px' }} to='/user/login'>Login </Link> with this emil or reset your password</h4>
          : <h4 style={{ textAlign: 'center' }}>{success}, or click here <Link style={{ margin: '0 10px' }} to='/user/login'>Login </Link></h4>}
      </>
    }</AuthIndex>
  )
}
export default UserActivation;