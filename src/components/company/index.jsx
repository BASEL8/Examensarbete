import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import programer_2 from '../../img/programer_2.jpeg'
import Hidden from '@material-ui/core/Hidden';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    paddingTop: 100,
    minHeight: '90vh',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  headerImage: {
    flexGrow: 1,
    flexShrink: 0,
    background: `url(${programer_2}) no-repeat center`,
    backgroundSize: 'cover',
    paddingLeft: 20,
    borderRadius: '10%',
    clipPath: 'polygon(30% 0%, 100% 0, 100% 30%, 100% 70%, 100% 100%, 67% 100%, 0 34%, 0 0)'

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
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    padding: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    '& > *': {
      flex: 1,
      padding: 20,
      margin: theme.spacing(3),
    }
  }, paperTitle: {
    fontWeight: 800,
    color: theme.palette.primary.main,
    fontSize: 28,
    marginBottom: 15
  },
  TapPaper: {
    minHeight: 300,
    maxWidth: 400,
    padding: 40,
    "& > * ": {
      padding: 20,
      textAlign: 'center'
    }
  }
}))
const fakeData = [
  { name: 'Quedro', by: 'Foad Farkhondeh', text: '"Best service for recruiting developers today. Have tested most major" known "players before where most of the communication was with sales-hungry recruiters, rather than DEVELOPERS. Demando has turned the cake and made it much easier to find relevant staff."' },
  {
    name: 'Quedro', by: 'basel', text: '"Best service for recruiting developers today. Have tested most major" known "players before where most of the communication was with sales-hungry recruiters, rather than DEVELOPERS. Demando has turned the cake and made it much easier to find relevant staff."'
  }, {
    name: 'Quedro', by: 'Kahla', text: '"Best service for recruiting developers today. Have tested most major" known "players before where most of the communication was with sales-hungry recruiters, rather than DEVELOPERS. Demando has turned the cake and made it much easier to find relevant staff."'
  }, { name: 'Quedro', by: 'Leo', text: '"Best service for recruiting developers today. Have tested most major" known "players before where most of the communication was with sales-hungry recruiters, rather than DEVELOPERS. Demando has turned the cake and made it much easier to find relevant staff."' },
  { name: 'Quedro', by: 'Kenzie', text: '"Best service for recruiting developers today. Have tested most major" known "players before where most of the communication was with sales-hungry recruiters, rather than DEVELOPERS. Demando has turned the cake and made it much easier to find relevant staff."' }
]
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}
const WhatPeopleSaying = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <div className={classes.root}>
      {fakeData.map(({ name, by, text }, index) => <TabPanel key={index} value={value} index={index}>
        <Paper className={classes.TapPaper}>
          <h5>{name}</h5>
          <p>{text}</p>
          <p>{by}</p>
        </Paper>
      </TabPanel>)}
      <div >
        {fakeData.map((data, index) => <Button key={index} onClick={() => setValue(index)} size="small">
          <FiberManualRecordIcon color="primary" fontSize="small" />
        </Button>
        )}
      </div>
    </div>
  );
}
const Company = () => {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.header}>
        <div style={{ padding: 50, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h2 className={classes.headerTitle}>
            Recruit tech talent in record time!
      </h2>
          <p className={classes.headerText}>
            Get access to a curated and active pool with tech talent who are all open to new challenges. Sign up and meet tech talent for free.      </p>
          <Button variant="contained" color="primary" style={{ marginTop: 30 }}>
            <Link className={classes.link} to={"/company/register"}>Register</Link>
          </Button>
        </div>
        <Hidden smDown> <div className={classes.headerImage}></div></Hidden>
      </div>
      <div>
        <div className={classes.paper}>
          <Paper elevation={3}>
            <h4 className={classes.paperTitle}>+10 000</h4>
            <p>tech talents that are open to new opportunities.</p>
          </Paper>
          <Paper elevation={3}>
            <h4 className={classes.paperTitle}>91%</h4>
            <p>of all requests answered by the talents within 2 weeks.</p>
          </Paper>
          <Paper elevation={3}>
            <h4 className={classes.paperTitle}>4 år</h4>
            <p>is the average experience of the talents.</p>
          </Paper>
        </div>
      </div>
      <div>
        <WhatPeopleSaying />
      </div>
    </div>
  )
}
export default Company;