import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  root: {

  },
  header: {
    paddingTop: 100,
    // minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  headerTitle: {
    fontSize: 30,
    fontFamily: 'Montserrat, sans-serif',
    lineHeight: 2,
    verticalAlign: 'baseline',
    letterSpacing: 'normal',
    wordSpacing: 0
  },
  headerText: {
    width: 400,
    paddingTop: 30,
    fontSize: 15,
    fontFamily: 'Montserrat, sans-serif'
  },
  section: {
  }
}))
const Steps = () => {
  return (<div>
    <div>

    </div>
    <div>

    </div>
  </div>)
}
const Home = () => {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.header}>
        <h2 className={classes.headerTitle}>
          Discover new career opportunities completely anonymously
      </h2>
        <p className={classes.headerText}>
          We match you and your wishes to hundreds of tech companies so that they can contact through personal offers, completely anonymously. Find out which employers are interested in you and can meet your expectations.
      </p>
      </div>
    </div>
  )
}
export default Home;