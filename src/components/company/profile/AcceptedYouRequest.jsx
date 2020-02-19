import React from 'react';
import { Paper, Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { declinedUser, blockUser } from '../../../actions/companyAuth'
import { getCookie } from '../../../actions/auth';
import { useState } from 'react';
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    background: theme.palette.primary.background,
    minHeight: 150,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10
  }
}));
const AcceptedYouRequest = ({ acceptedYouRequest, acceptedByYou, setForceUpdate, forceUpdate }) => {
  const classes = useStyles()
  const [error, setError] = useState('')
  const handleDeclinedUser = (_id) => {
    return declinedUser(getCookie('token'), _id).then(res => {
      if (res.error) {
        return setError(res.error)
      }
      setForceUpdate(!forceUpdate)
    })
  }
  const handleBlockUser = (_id) => {
    return blockUser(getCookie('token'), _id).then(res => {
      if (res.error) {
        return setError(res.error)
      }
      setForceUpdate(!forceUpdate)
    })
  }
  return (<div>
    {error && <p style={{ color: 'red', textAlign: 'center' }}>error</p>}
    <h4>Accepted your request</h4>
    {acceptedYouRequest && acceptedYouRequest.map(({ name, email, _id, profession, cities, languages }, index) =>
      <Paper key={_id} className={classes.paper}>
        <div className={classes.text}>
          <h4>{name}</h4>
          <p>{profession.name}</p>
          <p>{profession && profession.subProfessions.map(({ name, years }) => `${name} - ${years || 1}y`).join(', ')}</p>
          <p> {cities.join(', ')}</p>
          <p>{languages.join(', ')}</p>
          <p>{email}</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" color="secondary" onClick={() => handleBlockUser(_id)}>Hide</Button>
            <Button variant="outlined" color="secondary" onClick={() => handleDeclinedUser(_id)}  style={{ marginLeft: 10 }}>cancel</Button>
            <Button variant="outlined" color="primary" style={{ marginLeft: 10 }}>approved</Button>
          </div>
        </div>
      </Paper>
    )
    }
    <Divider style={{ margin: '20px 0' }} />
    <h4>Accepted by you</h4>
    {acceptedByYou && acceptedByYou.map(({ name, email, _id, profession, cities, languages }, index) =>
      <Paper key={_id} className={classes.paper}>

        <div className={classes.text}>
          <h4>{name}</h4>
          <p>{profession.name}</p>
          <p>{profession && profession.subProfessions.map(({ name }) => name).join(', ')}</p>
          <p> {cities.join(', ')}</p>
          <p>{languages.join(', ')}</p>
          <p>{email}</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" color="secondary" onClick={() => handleBlockUser(_id)}>Hide</Button>
            <Button variant="outlined" color="secondary" onClick={() => handleDeclinedUser(_id)}>cancel</Button>
            <Button variant="outlined" color="primary" style={{ marginLeft: 10 }}>approved</Button>
          </div>
        </div>
      </Paper>
    )
    }
  </div >)
}
export default AcceptedYouRequest;