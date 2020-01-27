import React, { useState, useEffect, Fragment } from 'react';
import { getCookie } from '../../../actions/auth'
import { contactMe } from '../../../actions/userAuth'
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
    maxHeight: 350,
    overflow: 'scroll',
    backgroundColor: theme.palette.background.paper,
  },
  text: {
    fontSize: 12,
    flex: 1
  },
}));
const CompanyJustForYou = () => {
  const classes = useStyles();
  const [companies, setCompanies] = useState([])
  const [error, setError] = useState('')
  const [forceUpdate, setForceUpdate] = useState(false)

  useEffect(() => {
    companyJustForYou(getCookie('token')).then(res => {
      if (res.error) {
        return setError(res.error)
      } else {
        setError('')
        return setCompanies(res)
      }
    })
  }, [forceUpdate])
  const handleContactRequest = (_id) => {
    contactMe(getCookie('token'), _id).then(res => {
      if (res.error) {
        return setError(res.error)
      }
      setError('')
      setTimeout(() => setForceUpdate(!forceUpdate), 3000)
    })
  }
  return (
    !error && companies.length !== 0 && <List className={classes.root}>
      {
        Array.isArray(companies) && companies.map(({ _id, profession, city, success, companyName }, index) =>
          <Fragment key={_id}>
            <ListItem alignItems="flex-start">
              <div className={classes.text}>
                <h4>{companyName}</h4>
                <h4>{profession.name}</h4>
                <p>{profession.subProfessions.map(({ name }) => name).join(', ')}</p>
                <p> {city}</p>
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
            {index !== companies.length - 1 && <Divider variant="fullWidth" component="li" />}
          </Fragment>
        )
      }
    </List>
  )
}
export default CompanyJustForYou;