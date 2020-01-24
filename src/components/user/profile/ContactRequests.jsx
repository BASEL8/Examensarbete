import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import { Button } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflow: 'scroll',
    backgroundColor: theme.palette.background.paper,
  },
  text: {
    fontSize: 12,
    flex: 1
  },
}));
const ContactRequests = ({ contactRequests }) => {
  const classes = useStyles()
  return (
    <>
      <h1>Want to contact you!</h1>
      <List className={classes.root}>{contactRequests && contactRequests.map(({ _id, companyName, profession, city, success }, index) =>
        <Fragment key={_id}>
          <ListItem alignItems="flex-start">
            <div className={classes.text}>
              <h4>{companyName}</h4>
              <p>{profession.name}</p>
              <p>{profession.subProfessions.map(({ name }) => name).join(', ')}</p>
              <p> {city}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Button>
                <HighlightOffIcon />
              </Button>
              <Button>
                <CheckCircleOutlinedIcon />
              </Button>
            </div>
          </ListItem>
          {index !== contactRequests.length - 1 && <Divider variant="fullWidth" component="li" />}
        </Fragment>
      )}
      </List>
    </>
  )
}
export default ContactRequests;