import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { isAuth } from '../../../actions/auth'
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    minHeight: 150
  },
  welcomeMessage: {
    padding: theme.spacing(2),
    textAlign: 'left',
    minHeight: 150,
    color: 'white',
    background: '#FFC200',
    textTransform: 'capitalize',
    '& > * ': {
      marginTop: 10,
      fontWeight: 600
    }
  },
  info: {
    padding: theme.spacing(2),
    minHeight: 150,
    background: '#51A7FA',
    color: 'white',
    '& > div': {
      marginBottom: 10,
      paddingBottom: 10,
      borderBottom: '1px solid white',
      '& > div': {
        marginTop: 10
      }
    },
    '& > div:last-child': {
      borderBottom: 'none'
    }
  },
  info_2: {
    padding: theme.spacing(2),
    minHeight: 150,
    background: '#029579',
    color: 'white',
    '& > div': {
      marginBottom: 10,
      paddingBottom: 10,
      borderBottom: '1px solid white',
      '& > div': {
        marginTop: 10
      }
    },
    '& > div:last-child': {
      borderBottom: 'none'
    }
  },
  soon: {
    padding: theme.spacing(2),
    minHeight: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 600,
    background: '#F4EFD3'
  },
  soon_1: {
    padding: theme.spacing(2),
    minHeight: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 600,
    background: '#B0EACD'
  },
  soon_2: {
    padding: theme.spacing(2),
    minHeight: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 600,
    background: '#FAAFFF'
  },
  soon_3: {
    padding: theme.spacing(2),
    minHeight: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 600,
    background: '#B1B075'
  }
}));
const TabProfile = () => {
  const classes = useStyles();
  const [user] = useState(isAuth())
  const {
    name,
    published,
    email,
    createdAt,
    updatedAt,
    available,
    cities,
    kindOfEmployment,
    languages,
    lookingForJob,
    priorityBenefits,
    profession,
    reasonToNewJob,
    salary,
    wantToWorkAs,
    about,
    workingRemotely
  } = user;
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.welcomeMessage}>
            <h2>Welcome</h2>
            <h2>{name}</h2>
            <div>
              <h3>{profession.name}</h3>
              <div style={{ marginTop: 3 }}>
                {profession.subProfessions.map((sub, index) => <Chip key={index}
                  color="primary"
                  style={{ marginRight: 10, marginTop: 5 }}
                  label={sub.name} size="small" spacing={1} />)}
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.welcomeMessage}>
            <div>
              created : <Moment fromNow>{createdAt}</Moment> </div>
            <div>
              last update: <Moment fromNow>{updatedAt}</Moment> <Button color="secondary" style={{ marginLeft: 10 }} variant="outlined" size="small"><Link style={{ textDecoration: 'none', color: 'unset' }} to={`/user/update/${user._id}`}>update</Link></Button>
            </div>

            <div style={{ textTransform: 'lowercase' }}>
              {email}
            </div>
            <div>
              published: {published ? <>yes <span role="img" aria-label="happy">&#128512;</span></> : <><span>no</span> <span role="img" aria-label="sad">&#128552;</span></>}
            </div>
            <div>{!published && <Button variant="outlined" color="secondary">Publish now</Button>}</div>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper className={classes.info}>
            <div>
              <h3>Looking for to work with</h3>
              <div>{lookingForJob}</div>
            </div>
            <div>
              <h3>You want to work as</h3>
              <div>{wantToWorkAs}</div>
            </div>
            <div>
              <h3>Working remotely</h3>
              <div>{workingRemotely}</div>
            </div>
            <div>
              <h3>Available from</h3>
              <div>{available}</div>
            </div>
            <div>
              <h3>{cities.length > 1 ? 'cities' : 'city'} that your are looking to work in : </h3>
              <div>{cities.join(', ')}</div>
            </div>
            <div>
              <h3>kind of employment</h3>
              <div>{kindOfEmployment}</div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.info_2}>
            <div>
              <h3>languages</h3>
              <div>{languages.join(', ')}</div>
            </div>
            <div>
              <h3>your {priorityBenefits.length} most priority benefits</h3>
              <div>{priorityBenefits.join(', ')}</div>
            </div>
            <div>
              <h3>reasonToNewJob</h3>
              <div>{reasonToNewJob}</div>
            </div>
            <div>
              <h3>salary you looking for</h3>
              <div>{salary}</div>
            </div>
            <div>
              <h3>About you</h3>
              <div>{about}</div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.soon}>sOon</Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.soon_1}>sOon</Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.soon_2}>sOon</Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.soon_3}>sOon</Paper>
        </Grid>
      </Grid>
    </div >
  )
}
export default TabProfile;