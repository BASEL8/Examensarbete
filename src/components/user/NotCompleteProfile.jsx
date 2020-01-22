import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import GeneralInfoForm from './form/GeneralInfoForm'
import ProfessionForm from './form/ProfessionForm'
import SendUserData from './form/SendUserData'
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
    '&>:first-child': {
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
  return ['General information', 'Profession', 'Send', error ? 'error' : 'Success'];
}
const FirstProfile = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0);
  const [userData, setUserData] = useState({
    about: 'about',
    wantToWorkAs: 'want to work as',
    cities: ['helsingborg'],
    kindOfEmployment: 'kind of',
    salary: 3000,
    languages: ['arabic'],
    lookingForJob: 'java',
    available: 'now',
    reasonToNewJob: 'blah',
    workingRemotely: 'yes',
    priorityBenefits: ['nothing'],
    profession: {
      name: 'Technology & development',
      years: 0,
      subProfessions: [{ name: 'System  Architect' }]
    },
  })
  const [error, setError] = useState('')
  const steps = getSteps(error);
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <GeneralInfoForm userData={userData} setUserData={setUserData} />;
      case 1:
        return <ProfessionForm userData={userData} setUserData={setUserData} />;
      case 2:
        return <SendUserData userData={userData} setError={setError} setActiveStep={setActiveStep} />;
      case 3:
        return <div className={classes.errorPage}>{error} , please try agin later...</div>;
      default:
        return 'Unknown step';
    }
  }
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
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
        <form>
          {getStepContent(activeStep)}
        </form>
        {activeStep !== 2 && <div>
          {activeStep !== 3 && <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>Back</Button>}
          {activeStep !== 3 && activeStep !== (steps.length - 2) ?

            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
              disabled={(activeStep === 1) && Object.values(userData).map(value => typeof value === 'object' ? Array.isArray(value) ? !!value.length : !!value.subProfessions.length : !!value).indexOf(false) !== -1}
            >Next</Button>
            :
            activeStep === 3 ?
              <Button variant="contained" color="primary" onClick={() => setActiveStep(0)}>Reset</Button>
              :
              <Button variant="contained" color="primary">Send</Button>
          }
        </div>}
      </div>
    </div>


  )
}
export default FirstProfile;