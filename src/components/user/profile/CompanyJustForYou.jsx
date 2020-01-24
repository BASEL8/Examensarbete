import React, { useState, useEffect, Fragment } from 'react';
import { getCookie } from '../../../actions/auth'
import { justForYourCompany, sendContactRequest } from '../../../actions/companyAuth'
import { companyJustForYou } from '../../../actions/userAuth'
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
    maxWidth: 360,
    maxHeight: 350,
    overflow: 'scroll',
    backgroundColor: theme.palette.background.paper,
  },
  text: {
    fontSize: 12,
  },
}));
const CompanyJustForYou = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    companyJustForYou(getCookie('token')).then(res => {
      if (res.error) {
        return setError(res.error)
      } else {
        console.log(res)
        //return setUsers(res)
      }
    })
  }, [])
  const handleContactRequest = (_id) => {
    sendContactRequest(getCookie('token'), _id).then(res => {
      if (res.error) {
        return setError(res.error)
      }

      setUsers(users.map((user, index) => {
        if (user._id === _id) {
          user.success = true;
        }
        return user;
      }));
    })
  }
  return (
    !error && users.length !== 0 && <List className={classes.root}>
      {
        users.map(({ _id, profession, cities, languages, success }, index) =>
          <Fragment key={_id}>
            <ListItem alignItems="flex-start">
              <div className={classes.text}>
                <h4>{profession.name}</h4>
                <p>{profession.subProfessions.map(({ name }) => name).join(', ')}</p>
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
  )
}
export default CompanyJustForYou;