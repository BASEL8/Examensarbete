import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import AuthIndex from '../AuthIndex'
import { useHistory,useParams } from 'react-router-dom'
import { isAuth } from '../../actions/auth'
import { resetPassword } from '../../actions/companyAuth'
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
const ResetPassword = () => {
  const classes = useStyles();
  const history = useHistory();
  const {token} = useParams()
  const [state, setState] = useState({  password: '', confirmPassword:'',error: '',message:'' })
  const {  password, confirmPassword,error,message } = state;
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
    if(password===confirmPassword){
      resetPassword(token,password).then(res => {
        if (res.err) {
          setOpenError(true)
          return setState({ ...setState, error: res.er, password: '',confirmPassword:'' })
        }
        setState({ ...state, error: '', password: '',confirmPassword:'',message:res.message })
      }
      )
    }else{
      setState({...state,error:'password and confirm password are different'})
      setOpenError(true)
    }
   
  }
  return (
    <AuthIndex>{
      <>
        <h3>Reset Password</h3>
        {!message?<form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            label="Password"
            name="password"
            value={password}
            onChange={handleChange}
            variant="outlined"
            type="password"
            required
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            variant="outlined"
            type="password"
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
export default ResetPassword;