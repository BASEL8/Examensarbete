import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '90vh',
    display: 'flex',
  },
  right: {
    boxShadow: '2px -8px 8px 0px #918b8b;',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    background: theme.palette.primary.main,
    color: 'white',
    padding: 20,
    '& p': {
      paddingTop: 40,
      fontSize: 13
    },
    '& h3': {
      paddingTop: 20,
      fontSize: 12
    }
  },
  left: {
    height: '100%',
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    '& > *': {
      marginBottom: 20
    }
  }
}));

const UserRegister = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Hidden smDown>
          <Grid item xs={3} style={{ padding: 0, margin: 0 }} >
            <div className={classes.right}>
              <p>"Streamlined from start to finish, no difficult extra steps without direct contact with potential employers."</p>
              <h3>Basel, frontend Developer</h3>
            </div>
          </Grid>
        </Hidden>
        <Grid item xs={12} md={9} style={{ padding: 0, margin: 0 }}>
          <div className={classes.left}>
            {children}
          </div>
        </Grid>
      </Grid>
    </div>

  )
}
export default UserRegister;