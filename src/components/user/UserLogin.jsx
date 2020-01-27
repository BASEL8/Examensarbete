import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import AuthIndex from '../AuthIndex'
import { login } from '../../actions/userAuth'
import { authenticate, isAuth } from '../../actions/auth'
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
const UserLogin = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
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
          authenticate(res, () => history.push(`/user/profile/${res.user._id}`))
        } else {
          authenticate(res, () => history.push(`/user/update/${res.user._id}`))
        }

      }
    })
  }
  return (
    <AuthIndex>{
      <>
        <h3>Login</h3>
        <Button variant="outlined" color="primary">
          <Link to="/company/login" className={classes.link}>Employer ? Login here</Link>
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
            label="Password"
            name="password"
            value={password}
            onChange={handleChange}
            variant="outlined"
            type="password"
          />
          <Button variant="contained" color="primary" size="large" type="submit">Login</Button>
        </form>
        {error && <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">{error}</Alert>
        </Snackbar>}
      </>
    }
    </AuthIndex>
  )

}
export default UserLogin;