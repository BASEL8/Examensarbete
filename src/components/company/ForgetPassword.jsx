import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import AuthIndex from '../AuthIndex'
import { useHistory } from 'react-router-dom'
import { isAuth } from '../../actions/auth'
import { forgetPassword } from '../../actions/companyAuth'
const useStyles = makeStyles(theme => ({
  form: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    '& > *': {
      margin: 10,
      flex: 1
    }
  },
  link: {
    textDecoration: 'none',
    fontWeight: 600,
    color: theme.palette.primary.main
  }
}));
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const ForgetPassword = () => {
  const classes = useStyles();
  const history = useHistory()
  const [state, setState] = useState({  email: '', error: '',message:'' })
  const {  email, error,message } = state;
  const [openError, setOpenError] = useState(true)
  useEffect(() => {
    if (isAuth()) {
      history.push("/")
    }
  }, [history])
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    forgetPassword(email).then(res => {
      if (res.err) {
        setOpenError(true)
        return setState({ ...setState, error: res.er, email: '' })
      }
      setState({ ...state, error: '', email: '',message:res.message })
    }
    )
  }
  return (
    <AuthIndex>{
      <>
        <h3>Reset Password</h3>
        {!message?<form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            label="Email"
            name="email"
            value={email}
            onChange={handleChange}
            variant="outlined"
            type="email"
            required
          />
          <Button variant="contained" color="primary" size="large" type="submit">Submit</Button>
        </form>:
        <p>{message}</p>
        }
        {error && <Snackbar open={openError} autoHideDuration={10000} onClose={() => setOpenError(false)} >
          <Alert onClose={() => setOpenError(false)} severity="error">{error}</Alert>
        </Snackbar>}
      </>
    }</AuthIndex>
  )
}
export default ForgetPassword;