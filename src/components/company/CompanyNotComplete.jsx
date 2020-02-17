import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { isAuth } from '../../actions/auth';
import GeneralInfoForm from './form/GeneralInfoForm'
import SendUserData from './form/SendUserData'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column'
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    background: 'white',
    padding: 10,
  },
  right: {
    flex: 1,
    height: '100%',
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    '&>:not(:last-child)': {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: '100%'
    },
    '& > form': {
      padding: 30,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      '& > * ': {
        marginTop: 30,
        width: '100%',
      }

    }
  },
  stepper: {
    background: 'none',
  },
  errorPage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));
function getSteps(error) {
  return ['General information', 'Send', error ? 'error' : 'Success'];
}
const CompanyNotComplete = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0);
  let user = isAuth()
  delete user.role
  delete user.published
  delete user.confirmed
  delete user.contactedByYou
  delete user.__v
  delete user.eventsTracker
  delete user.acceptedYourRequest
  delete user.resetPassword
  const [userData, setUserData] = useState({
    about: '',
    website: '',
    createdBy: '',
    city: '',
    workingRemotely: '',
    professions:[],
    subProfessions:[]
  })
  const [error, setError] = useState('')
  const steps = getSteps(error);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <GeneralInfoForm userData={userData} setUserData={setUserData} />;
      case 1:
        return <SendUserData userData={userData} setError={setError} setActiveStep={setActiveStep} />;
      case 2:
        return error ? <div className={classes.errorPage}>{error} , please try agin later...</div> : <div className={classes.errorPage}>
          <p>your profile is ready, don't forget to publish it!</p>
          <p> <Link to={`/company/profile/${isAuth()._id}`}> Profile</Link></p>
        </div>;
      default:
        return 'Unknown step';
    }
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <Stepper activeStep={activeStep} alternativeLabel={true} orientation="horizontal" className={classes.stepper}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
      <div className={classes.right}>
        <p>basel</p>
        <form>
          {getStepContent(activeStep)}
        </form>
        <div>
          {activeStep === 0 && <Button
            variant="outlined"
            color="primary"
            onClick={handleNext}
            className={classes.button}
            disabled={(activeStep === 0) && Object.values(userData).map(value => typeof value === 'object' ? Array.isArray(value) ? !!value.length : !!value.subProfessions.length : !!value).indexOf(false) !== -1}
          >Next</Button>
          }
          {activeStep === 2 && error && <Button variant="outlined" color="primary" onClick={() => setActiveStep(0)}>Reset</Button>}
        </div>
      </div>
    </div >

  )
}
export default CompanyNotComplete;