import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import { Button } from '@material-ui/core';
import { getCookie } from '../../../actions/auth';
import { cancelContactUser, declineContactRequestFromUser, acceptContactRequestFromUser } from '../../../actions/companyAuth';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflow: 'scroll',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4
  },
  text: {
    fontSize: 12,
    flex: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    background: theme.palette.primary.background,
    minHeight: 150,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  eventsTracker: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    background: theme.palette.primary.background,
    minHeight: 150,
    height: '100%',
  }
}));


const ContactedByYou = ({ contactedByYou, wantToContactYou, forceUpdate, setForceUpdate }) => {
  const classes = useStyles()
  const [error, setError] = useState('')
  const handleCancelContactUser = (_id) => {
    cancelContactUser(getCookie('token'), _id).then(res => {
      if (res.error) {
        return setError(res.error)
      }
      setForceUpdate(!forceUpdate)
      setError('')
    })
  }
  const handleDeclineContactRequestFromUser = (_id) => {
    return declineContactRequestFromUser(getCookie('token'), _id).then(res => {
      if (res.error) {
        return setError(res.error)
      }
      setForceUpdate(!forceUpdate)
    })

  }
  const handleAcceptContactRequestFromUser = (_id) => {
    return acceptContactRequestFromUser(getCookie('token'), _id).then(res => {
      if (res.error) {
        return setError(res.error)
      }
      setForceUpdate(!forceUpdate)
    })
  }
  return (
    <>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <h4>contacted by you</h4>
            {contactedByYou && contactedByYou.length !== 0 && <List className={classes.root}>{contactedByYou && contactedByYou.map(({ _id, profession, cities, languages, success }, index) =>
              <Fragment key={_id}>
                <ListItem alignItems="flex-start">
                  <div className={classes.text}>
                    <h4>{profession.name}</h4>
                    <p>{profession && profession.subProfessions.map(({ name }) => name).join(', ')}</p>
                    <p> {cities.join(', ')}</p>
                    <p>{languages.join(', ')}</p>
                  </div>
                  <ListItemAvatar style={{ textAlign: 'right' }}>
                    <HighlightOffIcon onClick={() => handleCancelContactUser(_id)} />
                  </ListItemAvatar>
                </ListItem>
                {index !== contactedByYou.length - 1 && <Divider variant="fullWidth" component="li" />}
              </Fragment>
            )}
            </List>
            }
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.eventsTracker}>
            <h4>want to contact you</h4>
            {wantToContactYou && wantToContactYou.length !== 0 && <List className={classes.root}>{wantToContactYou && wantToContactYou.map(({ _id, profession, cities, languages, success }, index) =>
              <Fragment key={_id}>
                <ListItem alignItems="flex-start">
                  <div className={classes.text}>
                    <h4>{profession.name}</h4>
                    <p>{profession && profession.subProfessions.map(({ name }) => name).join(', ')}</p>
                    <p> {cities.join(', ')}</p>
                    <p>{languages.join(', ')}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Button onClick={() => handleDeclineContactRequestFromUser(_id)}>
                      <HighlightOffIcon fontSize="small" />
                    </Button>
                    <Button onClick={() => handleAcceptContactRequestFromUser(_id)}>
                      <CheckCircleOutlinedIcon fontSize="small" />
                    </Button>
                  </div>
                </ListItem>
                {index !== wantToContactYou.length - 1 && <Divider variant="fullWidth" component="li" />}
              </Fragment>
            )}
            </List>
            }
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
export default ContactedByYou;