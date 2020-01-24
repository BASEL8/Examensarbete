import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
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


const ContactedByYou = ({ contactedByYou }) => {
  const classes = useStyles()
  return (
    <>
      <h1>contacted by you</h1>
      <List className={classes.root}>{contactedByYou.map(({ _id, profession, cities, languages, success }, index) =>
        <Fragment key={_id}>
          <ListItem alignItems="flex-start">
            <div className={classes.text}>
              <h4>{profession.name}</h4>
              <p>{profession.subProfessions.map(({ name }) => name).join(', ')}</p>
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
    </>
  )
}
export default ContactedByYou;