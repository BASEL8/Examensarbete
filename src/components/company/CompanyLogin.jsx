import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import AuthIndex from '../AuthIndex'
import { isAuth, authenticate } from '../../actions/auth'
import { login } from '../../actions/companyAuth'
const useStyles = makeStyles(theme => ({
  left: {
    height: '100%',
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    '& > * ': {
      marginTop: 20
    }
  },
  form: {
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'stretch',
    },
    '& > *': {
      margin: 10,
      flex: 1
    }
  }
}));
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const UserLogin = () => {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = useState({ email: location.state && location.state.email ? location.state.email : '', password: '', error: '' })
  const { email, password, error } = state;
  const [open, setOpen] = useState(true)
  useEffect(() => {
    if (isAuth()) {
      history.push("/")
    }
  }, [history])
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleClose = (event, reason) => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    login({ email, password }).then(res => {
      if (res.error) {
        setOpen(true)
        return setState({ ...state, email: '', password: '', error: res.error })
      } else {
        setState({ ...state, error: '', loading: false })
        if (res.user.profileComplete) {
          authenticate(res, () => history.push(`/company/profile/${res.user._id}`))
        } else {
          authenticate(res, () => history.push(`/company/update/${res.user._id}`))
        }
      }
    })
  }

  return (
    <AuthIndex>{
      <>
        <h3>Login</h3>
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
            label="Password"
            name="password"
            value={password}
            onChange={handleChange}
            variant="outlined"
            type="password"
          />
          <Button variant="contained" color="primary" size="large" type="submit">Login</Button>
        </form>
        {error && <Snackbar open={open} autoHideDuration={10000} onClose={handleClose} style={{ position: 'fixed', left: 100 }}>
          <Alert onClose={handleClose} severity="error">{error}</Alert>
        </Snackbar>}
      </>
    }</AuthIndex>
  )
}
export default UserLogin;