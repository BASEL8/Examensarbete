import React, { useEffect, useState, Fragment } from 'react';
import { getCookie } from '../../../actions/auth'
import { justForYourCompany, sendContactRequest } from '../../../actions/companyAuth'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import SendIcon from '@material-ui/icons/Send';
import { Button } from '@material-ui/core';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxHeight: 350,
    overflow: 'scroll',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4
  },
  text: {
    fontSize: 12,
    flex: 1
  },
}));

const JustForYourCompany = ({ forceUpdate, setForceUpdate }) => {
  const classes = useStyles();
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    justForYourCompany(getCookie('token')).then(res => {
      if (res.error) {
        return setError(res.error)
      } else {
        setError('')
        return setUsers(res)
      }
    })
  }, [forceUpdate])
  const handleContactRequest = (_id) => {
    sendContactRequest(getCookie('token'), _id).then(res => {
      if (res.error) {
        return setError(res.error)
      }
      setError('')
      setForceUpdate(!forceUpdate)
    })
  }
  if (error) return <p>{error}</p>
  return (
    users && users.length !== 0 &&
    <List className={classes.root}>
      {
        users.map(({ _id, profession, cities, languages, success }, index) =>
          <Fragment key={_id}>
            <ListItem alignItems="flex-start">
              <div className={classes.text}>
                <h4>{profession.name}</h4>
                <p>{profession && profession.subProfessions.map(({ name }) => name).join(', ')}</p>
                <p> {cities.join(', ')}</p>
                <p>{languages.join(', ')}</p>
              </div>
              <ListItemAvatar style={{ textAlign: 'right' }}>
                {success ?
                  <DoneOutlineIcon color="primary" />
                  :
                  <Button onClick={() => handleContactRequest(_id)}>
                    <SendIcon fontSize="small" color="primary" />
                  </Button>}
              </ListItemAvatar>
            </ListItem>
            {index !== users.length - 1 && <Divider variant="fullWidth" component="li" />}
          </Fragment>
        )
      }
    </List>

  );
}

export default JustForYourCompany;