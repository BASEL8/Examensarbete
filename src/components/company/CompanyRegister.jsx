import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import AuthIndex from '../AuthIndex'
import { useHistory, Link } from 'react-router-dom'
import { isAuth } from '../../actions/auth'
import { preSignup } from '../../actions/companyAuth'
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
const CompanyRegister = () => {
  const classes = useStyles();
  const history = useHistory()
  const [state, setState] = useState({ companyName: '', email: '', password: '', organisationNumber: '', error: '', message: '' })
  const { companyName, email, password, organisationNumber, error, message } = state;
  const [openError, setOpenError] = useState(true)
  const [openSuccess, setOpenSuccess] = useState(true)
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
    preSignup({ email, companyName, organisationNumber, password }).then(res => {
      if (res.err) {
        setOpenError(true)
        return setState({ ...setState, error: res.er, companyName: '', email: '', password: '', message: '' })
      }
      setOpenSuccess(true)
      setState({ ...state, error: '', companyName: '', email: '', password: '', organisationNumber: '', message: res.success })
    }
    )
  }

  return (
    <AuthIndex>{
      <>
        <h3>Create Account for your company</h3>
        <Button variant="outlined" color="primary">
          <Link className={classes.link} to="/user/register">talents ? Register here</Link>
        </Button>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            label="Email"
            name="email"
            value={email}
            onChange={handleChange}
            variant="outlined"
            type="email"
          />
          <TextField
            label="company name"
            name="companyName"
            value={companyName}
            onChange={handleChange}
            variant="outlined"
            type="text"
          />
          <TextField
            label="Organisation number"
            name="organisationNumber"
            value={organisationNumber}
            onChange={handleChange}
            variant="outlined"
            type="text"
          />
          <TextField
            label="Password"
            name="password"
            value={password}
            onChange={handleChange}
            variant="outlined"
            type="password"
          />
          <Button variant="contained" color="primary" size="large" type="submit">Submit</Button>
        </form>
        {error && <Snackbar open={openError} autoHideDuration={10000} onClose={() => setOpenError(false)} >
          <Alert onClose={() => setOpenError(false)} severity="error">{error}</Alert>
        </Snackbar>}
        {message && <Snackbar open={openSuccess} autoHideDuration={10000} onClose={() => setOpenSuccess(false)} >
          <Alert onClose={() => setOpenSuccess(false)} severity="success">{message}</Alert>
        </Snackbar>}
      </>
    }</AuthIndex>
  )
}
export default CompanyRegister;