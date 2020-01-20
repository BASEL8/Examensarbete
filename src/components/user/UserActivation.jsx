import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import AuthIndex from '../AuthIndex'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const UserActivation = () => {
  const { activationToken } = useParams()
  const [state, setState] = useState({ error: 'test' })
  const { error } = state;
  const [open, setOpen] = useState(true)
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <AuthIndex>{
      <>
        <h3>{activationToken}</h3>
        <p>waiting for user account Activation</p>
        {error && <Snackbar open={open} autoHideDuration={10000} onClose={handleClose} style={{ position: 'fixed', left: 100 }}>
          <Alert onClose={handleClose} severity="error">{error}</Alert>
        </Snackbar>}
      </>
    }</AuthIndex>
  )
}
export default UserActivation;