import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: '#F3CA4B',
    display: 'flex',
    alignItems: 'center'
  },
  paper: {
    minHeight: 140,
    minWidth: 100,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 5,
    background: 'none',
    color: '#2C395A',
    border: '1px solid #2C395A',
    borderRadius: 4
  },
  title: {
    paddingBottom: theme.spacing(2),
    textTransform: 'uppercase',
    fontSize: 14
  },
  control: {
    padding: theme.spacing(2),
  },
}));
const Footer = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="space-around" spacing={10}>
          <Grid item>
            <div className={classes.paper}>
              <h3 className={classes.title}>
                Logo
              </h3>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.paper}>
              <h3 className={classes.title}>
                contact us
              </h3>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.paper}>
              <h3 className={classes.title}>
                about us
              </h3>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.paper}>
              <h3 className={classes.title}>
                more information
              </h3>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Footer;