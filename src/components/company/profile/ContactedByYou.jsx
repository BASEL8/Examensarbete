import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
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


const ContactedByYou = ({ contactedByYou, eventsTracker }) => {
  const classes = useStyles()
  return (
    <>
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
                    <HighlightOffIcon />
                  </ListItemAvatar>
                </ListItem>
                {index !== contactedByYou.length - 1 && <Divider variant="fullWidth" component="li" />}
              </Fragment>
            )}
            </List>
            }</Paper>
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
export default ContactedByYou;