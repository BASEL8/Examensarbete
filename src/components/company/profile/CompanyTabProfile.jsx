import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { isAuth, getCookie } from '../../../actions/auth'
import { getCompanyProfile } from '../../../actions/companyAuth'
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom'
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddAnnounceModal from './AddAnnounceModal'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import HelpIcon from '@material-ui/icons/Help';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
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
  card: {
    width: '100%',
    padding: 10,
    display: 'flex',
    alignItems: 'space-between',
    justifyContent: 'center',
    flexDirection: 'column',
    '&>div': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& > span': {
        marginRight: 10
      }
    }
  },

}));
const CompanyTabProfile = () => {
  const classes = useStyles();
  const [user, setUserData] = useState({})
  const history = useHistory()
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!isAuth()) {
      history.pushState('/')
    }
    getCompanyProfile(getCookie('token')).then(res => {
      if (res.error) {
        return setError(res.error)
      } else {
        setUserData({ ...res.company, announces: res.announces })
      }
    })
  }, [history, open])
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const {
    companyName,
    email,
    createdAt,
    updatedAt,
    city,
    about,
    organisationNumber,
    confirmed,
    website,
    createdBy,
    announces
  } = user;

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <h4>Welcome</h4>
            <h2>
              <span style={{ marginRight: 10 }}>
                {companyName}</span>
              {
                confirmed ?
                  <VerifiedUserIcon fontSize="small" /> :
                  <HelpIcon fontSize="small" />
              }
            </h2>
            <div style={{ marginTop: 0 }}>
              <p>{organisationNumber}</p>
            </div>
            <div>
              <div>{about}</div>
            </div>
            <div>
              <Button
                color="primary"
                variant="outlined"
                onClick={handleOpen}
                style={{ zIndex: 100 }}
              ><span style={{ marginRight: 10 }}>add announce</span><AddBoxIcon /></Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <div>
              Created by : <span>{createdBy}</span>
            </div>
            <div>
              created :<span><Moment fromNow>{createdAt}</Moment></span></div>
            <div>
              last update: <span><Moment fromNow>{updatedAt}</Moment></span> <Button color="primary" style={{ marginLeft: 10, zIndex: 100 }} variant="outlined" size="small"><Link style={{ textDecoration: 'none', color: 'unset' }} to={`/company/update/${user._id}`}>update</Link></Button>
            </div>
            <div style={{ textTransform: 'lowercase' }}>
              {email}
            </div>
            <div>
              City : <span>{city}</span>
            </div>
            <div>
              Website : <span>{website}</span>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} style={{ maxHeight: 400, overflow: 'scroll' }}>
            <h3>Announces by you</h3>
            {announces && announces.map(({ _id, profession, createdAt, updatedAt }, index) => <Paper key={_id} className={classes.card}>
              <div>
                <h4>{profession.name}</h4>
                <Button size="small" style={{ zIndex: 100 }}><HighlightOffIcon /></Button>
              </div>
              <div style={{ justifyContent: 'flex-start', fontSize: 10 }}>
                <span>created : <Moment fromNow>{createdAt}</Moment></span>
                <span>last update : <Moment fromNow>{updatedAt}</Moment></span>
              </div>
            </Paper>)}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <div>
              <h3>Talents just for you</h3>
              <div>find talent according to your company information or job announce</div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>sOon</Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>sOon</Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>sOon</Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>sOon</Paper>
        </Grid>
      </Grid>
      <AddAnnounceModal handleOpen={handleOpen} handleClose={handleClose} open={open} />
    </div >
  )
}
export default CompanyTabProfile;