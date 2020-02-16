import React, { useState, useEffect, Fragment } from 'react';
import { getCookie } from '../../../actions/auth'
import {  unblockUser } from '../../../actions/companyAuth'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Button } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxHeight: 350,
    overflow: 'scroll',
    backgroundColor: theme.palette.background.paper,
  },
  text: {
    fontSize: 12,
    flex: 1
  },
}));
const BlockedUsers = ({blockedUsers,setForceUpdate,forceUpdate })=>{
  const classes = useStyles();
  const [error, setError] = useState('')
  const handleUnblock = (_id) => {
    unblockUser(getCookie('token'), _id).then(res => {
      if (res.error) {
        return setError(res.error)
      }
      setError('')
      setForceUpdate(!forceUpdate)
    })
  }
  console.log(blockedUsers)
  return (
  <List className={classes.root}>
    {
      blockedUsers && blockedUsers.map(({ _id, profession, cities, name }, index) =>
        <Fragment key={_id}>
          <ListItem alignItems="flex-start">
            <div className={classes.text}>
              <h4>{name}</h4>
              <h4>{profession.name}</h4>
              <p>{profession.subProfessions.map(({ name }) => name).join(', ')}</p>
              <p> {cities.join(', ')}</p>
            </div>
            <ListItemAvatar style={{ textAlign: 'right' }}>
              <Button onClick={()=>handleUnblock(_id)}>
                <LockOpenIcon fontSize="small" color="primary" />
              </Button>
            </ListItemAvatar>
          </ListItem>
          {index !== blockedUsers.length - 1 && <Divider variant="fullWidth" component="li" />}
        </Fragment>
      )
    }
  </List>
  )
}

export default BlockedUsers;