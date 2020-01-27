import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom'
import CompanyJustForYou from './CompanyJustForYou';
import { userPublish } from '../../../actions/userAuth'
import { getCookie } from '../../../actions/auth';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
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
    '& > * ': {
      flex: 1,
      marginTop: 10,
      '& > span': {
        fontWeight: 600,
      }
    }
  },
  info: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    background: theme.palette.primary.background,
    minHeight: 150,
    height: '100%',
    fontSize: 10,
    '& > * ': {
      marginTop: 5,
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
const TabProfile = ({ user, forceUpdate, setForceUpdate }) => {
  const [error, setError] = useState('')
  const classes = useStyles();
  const {
    name,
    published,
    email,
    createdAt,
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
    workingRemotely,
    eventsTracker
  } = user;
  const handleProfileStatus = () => {
    return userPublish(getCookie('token')).then(res => {
      if (res.error) {
        return setError(res.error)
      }
      setError('')
      setForceUpdate(!forceUpdate)
    })
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <h4>Welcome</h4>
            <h2>{name}</h2>
            <div>
              <h4>{profession && profession.name}</h4>
              <div style={{ marginTop: 3 }}>
                {profession && profession.subProfessions.map((sub, index) => <Chip key={index}
                  color="primary"
                  variant="outlined"
                  style={{ marginRight: 10, marginTop: 5 }}
                  label={sub.name} size="small" spacing={1} />)}
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <div>
              created :<span><Moment fromNow>{createdAt}</Moment></span></div>
            <div style={{ textTransform: 'lowercase' }}>
              {email}
            </div>
            <div>

              {!published ? <Button size="small" variant="outlined" color="primary" onClick={handleProfileStatus}>Publish now</Button> : <Button size="small" variant="outlined" color="primary" onClick={handleProfileStatus}>hide</Button>}
            </div>
            <div>
              <Button color="primary" variant="outlined" size="small"><Link style={{ textDecoration: 'none', color: 'unset' }} to={`/user/update/${user._id}`}>update</Link></Button>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper className={classes.info}>
            <div>
              <div>Looking for to work with</div>
              <h3>{lookingForJob}</h3>
            </div>
            <div>
              <div>You want to work as</div>
              <h3>{wantToWorkAs}</h3>
            </div>
            <div>
              <div>Working remotely</div>
              <h3>{workingRemotely}</h3>
            </div>
            <div>
              <div>Available from</div>
              <h3>{available}</h3>
            </div>
            <div>
              <div>{cities && cities.length > 1 ? 'cities' : 'city'} that your are looking to work in : </div>
              <h3>{cities && cities.join(', ')}</h3>
            </div>
            <div>
              <div>kind of employment</div>
              <h3>{kindOfEmployment}</h3>
            </div>
            <div>
              <div>languages</div>
              <h3>{languages && languages.join(', ')}</h3>
            </div>
            <div>
              <div>your {priorityBenefits && priorityBenefits.length} most priority benefits</div>
              <h3>{priorityBenefits && priorityBenefits.join(', ')}</h3>
            </div>
            <div>
              <div>reasonToNewJob</div>
              <h3>{reasonToNewJob}</h3>
            </div>
            <div>
              <div>salary you looking for</div>
              <h3>{salary}</h3>
            </div>
            <div>
              <div>About you</div>
              <h3>{about}</h3>
            </div>

          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.eventsTracker} style={{ maxHeight: 480, overflow: 'scroll' }}>
            <h4>History</h4>
            {eventsTracker && eventsTracker.map(({ eventName, _id, date }, index) => <div key={_id} style={{ fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p>{eventName}</p><Moment fromNow>{date}</Moment></div>)}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>sOon</Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>sOon</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <CompanyJustForYou />
          </Paper>
        </Grid>
      </Grid>
    </div >
  )
}
export default TabProfile;