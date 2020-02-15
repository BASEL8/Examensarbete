import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddAnnounceModal from './AddAnnounceModal'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import HelpIcon from '@material-ui/icons/Help';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RemoveAnnounceModal from './RemoveAnnounceModal';
import Chip from '@material-ui/core/Chip';
import JustForYourCompany from './JustForYourCompany'

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
    borderRadius: 4,
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
const CompanyTabProfile = ({ user, setError, setForceUpdate, forceUpdate }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openRemove, setOpenRemove] = useState({ status: false, _id: '' });
  const { companyName,
    email,
    createdAt,
    city,
    about,
    organisationNumber,
    confirmed,
    website,
    createdBy,
    professions,
    subProfessions,
    announces,
    eventsTracker
  } = user;
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setForceUpdate(!forceUpdate)
  };
  const handleOpenRemove = (_id) => {
    setOpenRemove({ status: true, _id });
  };

  const handleCloseRemove = () => {
    setOpenRemove({ status: false, _id: '' });
    setForceUpdate(!forceUpdate)
  };
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

            <div style={{ marginTop: 15,marginBottom:15 }}>
              {/* <h4>{profession && profession.name}</h4>*/}
              <div>
                {professions && professions.map(({name}, index) => <Chip key={index}
                  color="primary"
                  variant="outlined"
                  style={{ marginRight: 10, marginTop: 5 }}
                  label={name} size="small" spacing={1} />)}
              </div> 
              <div style={{ marginTop: 15 }}>
                {subProfessions && subProfessions.map(({name}, index) => <Chip key={index}
                  color="secondary"
                  variant="outlined"
                  style={{ marginRight: 10, marginTop: 5 }}
                  label={name} size="small" spacing={1} />)}
              </div> 
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
            <div style={{ textTransform: 'lowercase' }}>
              {email}
            </div>
            <div>
              City : <span>{city}</span>
            </div>
            <div>
              Website : <span>{website}</span>
            </div>
            <div>
              <Button color="primary" style={{ zIndex: 100 }} variant="outlined" size="small"><Link style={{ textDecoration: 'none', color: 'unset' }} to={`/company/update/${user._id}`}>update</Link></Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} style={{ maxHeight: 400, overflow: 'scroll' }}>
            <h3>Announces by you</h3>
            {announces && announces.map(({ _id, profession, createdAt, updatedAt }, index) => <Paper key={_id} className={classes.card}>
              <div>
                <h4>{profession.name}</h4>
                <Button size="small" style={{ zIndex: 100 }} onClick={() => handleOpenRemove(_id)}><HighlightOffIcon /></Button>
              </div>
              <div style={{ justifyContent: 'flex-start', fontSize: 10, marginBottom: 5 }}>
                <span>{profession && profession.subProfessions.map(({ name }) => name).join(', ')}</span>
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
            <div style={{ flex: 0 }}>
              <h3>People you may want to meet</h3>
              <div style={{ fontSize: 10 }}>find them according to your company information</div>
            </div>
            <JustForYourCompany forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} style={{ maxHeight: 480, overflow: 'scroll' }}>
            <h4>History</h4>
            {eventsTracker && eventsTracker.map(({ eventName, _id, date }, index) => <div key={_id} style={{ fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
              <p>{eventName}</p><Moment fromNow>{date}</Moment></div>)}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>sOon</Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>sOon</Paper>
        </Grid>
      </Grid>
      <AddAnnounceModal handleOpen={handleOpen} handleClose={handleClose} open={open} />
      <RemoveAnnounceModal handleClose={handleCloseRemove} handleOpen={handleOpenRemove} open={openRemove} setError={setError} />
    </div >
  )
}
export default CompanyTabProfile;