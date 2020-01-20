import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => {
  return ({
    root: {
      minHeight: 400,
      background: theme.palette.primary.main,
      display: 'flex',
      alignItems: 'center',
    },
    paper: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: 20,
      paddingTop: 5,
      background: 'none',
      color: 'white',
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
    grid: {
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
      [theme.breakpoints.down('sm')]: {
        "& > *": {
          flexBasis: '40%'
        }
      }
    }
  })
});
const Footer = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container justify="space-around" className={classes.grid} >
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