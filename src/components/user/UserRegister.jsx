import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import AuthIndex from '../AuthIndex'
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


const UserRegister = () => {
  const classes = useStyles();
  const [state, setState] = useState({ name: '', email: '', password: '', error: 'test' })
  const { name, email, password, error } = state;
  const [open, setOpen] = useState(true)
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleClose = (event, reason) => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(state)
  }

  return (
    <AuthIndex>{
      <>
        <h3>Create Account</h3>
        <p>You are now minutes from getting offers from +800 tech companies</p>
        <Link to="/company/register">Employer ? Register here</Link>
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
            label="Name"
            name="name"
            value={name}
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
        {error && <Snackbar open={open} autoHideDuration={10000} onClose={handleClose} style={{ position: 'fixed', left: 100 }}>
          <Alert onClose={handleClose} severity="error">{error}</Alert>
        </Snackbar>}
      </>
    }</AuthIndex>
  )
}
export default UserRegister;