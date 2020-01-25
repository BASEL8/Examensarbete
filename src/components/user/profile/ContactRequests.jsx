import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import { Button } from '@material-ui/core';
import Moment from 'react-moment';

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
    '& > * ': {
      marginTop: 10,
      '& > span': {
        fontWeight: 600,
      }
    }
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
const ContactRequests = ({ contactRequests, eventsTracker }) => {
  const classes = useStyles()
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <h4>Want to contact you!</h4>
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
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.eventsTracker}>
            <h4>History</h4>
            {eventsTracker && eventsTracker.map(({ eventName, _id, date }, index) => <div key={_id} style={{ fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p>{eventName}</p><Moment fromNow>{date}</Moment></div>)}
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
export default ContactRequests;