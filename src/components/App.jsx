import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

//my imports 
import MainRouter from './MainRouter'
import NavLinks from './NavLinks'
import Footer from './Footer'
import { NAME } from '../config'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    flex: 1,
    flexDirection: 'column'
  },
  appBar: {
    boxShadow: "none",
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold'
  },
  hide: {
    display: 'none',
  },
  drawer: {
    // width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    marginTop: 50,
    paddingTop: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  homePageLink: {
    textDecoration: 'none',
    color: 'white'
  }
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="relative"
        className={classes.appBar}
      >
        <Toolbar>
          <Typography variant="h5" noWrap className={classes.title}>
            {NAME}
          </Typography>
          <NavLinks />
        </Toolbar>
      </AppBar>
      <main style={{ flex: 1, paddingTop: 0 }}>
        <div style={{ flex: 1 }}>
          <MainRouter />
        </div>
        <Footer />
      </main>

    </div>
  );
}

export default App;
