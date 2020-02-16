import React from 'react';
import { Paper, Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { cancelRequest } from '../../../actions/userAuth'
import { getCookie } from '../../../actions/auth'
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
const CompaniesYouAccepted = ({ acceptedByYou, acceptedYourRequest, forceUpdate, setForceUpdate }) => {
  const classes = useStyles()
  const cancel = (_id) => {
    return cancelRequest(getCookie('token'), _id).then(res => {
      if (res.error) {
        return console.log(res.error)
      }
      setForceUpdate(!forceUpdate)
    })
  }
  return (<div>
    <h4>accepted contact from</h4>
    {acceptedByYou && acceptedByYou.map(({ companyName, _id, professions, subProfessions,city }, index) =>
      <Paper key={_id} className={classes.paper}>
        <div className={classes.text}>
          <h4>{companyName}</h4>
          <p>{professions.map(({ name }) => name).join(', ')}</p>
          <p>{ subProfessions.map(({ name }) => name).join(', ')}</p>
          <p> {city}</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" color="secondary" onClick={() => cancel(_id)}>cancel</Button>
          </div>
        </div>
      </Paper>
    )
    }
    <Divider style={{ margin: '20px 0' }} />
    <h4>Accepted your request</h4>
    {acceptedYourRequest && acceptedYourRequest.map(({ companyName, _id, professions,subProfessions, city }, index) =>
      <Paper key={_id} className={classes.paper}>
        <div className={classes.text}>
          <h4>{companyName}</h4>
          <p>{professions.name}</p>
          <p>{subProfessions.map(({ name }) => name).join(', ')}</p>
          <p> {city}</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" color="secondary" onClick={() => cancel(_id)}>cancel</Button>
          </div>
        </div>
      </Paper>
    )
    }
  </div >)
}
export default CompaniesYouAccepted;