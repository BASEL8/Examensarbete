import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import GeneralInfoForm from './form/GeneralInfoForm'
import ProfessionForm from './form/ProfessionForm'
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '90vh',
    display: 'flex',
  },
  right: {
    boxShadow: '0px 8px 9px 0px #918b8b',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    height: '100%',
    background: 'white',
    padding: 50,
  },
  left: {
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
  }
}));
function getSteps(error) {
  return ['General information', 'Profession', 'Confirm', 'Send', error ? 'Success' : '?'];
}
const FirstProfile = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0);
  const [userData, setUserData] = useState({
    about: '',
    wantToWorkAs: '',
    cities: [],
    kindOfEmployment: '',
    salary: 0,
    languages: [],
    lookingForJob: '',
    available: '',
    reasonToNewJob: '',
    workingRemotely: '',
    priorityBenefits: [],
    profession: {
      name: 'Technology & development',
      years: 0,
      subProfessions: [{ name: 'System  Architect' }]
    },
    reasonToNewJob: '',
    workingRemotely: '',
    priorityBenefits: []
  })
  const steps = getSteps();
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <GeneralInfoForm userData={userData} setUserData={setUserData} />;
      case 1:
        return <ProfessionForm userData={userData} setUserData={setUserData} />;
      case 2:
        return <p>Confirm</p>;
      case 3:
        return <p>send</p>;
      case 4:
        return <p>data sent</p>;
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
  const handleSend = () => { }
  //console.log(userData)
  const handelSubmit = () => { }
  useEffect(() => {
    console.log(Object.values(userData).map(value => typeof value))
    console.log(Object.values(userData).map(value => typeof value === 'object' ? Array.isArray(value) ? !!value.length : !!value.subProfessions.length : !!value))
  }, [userData])
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} md={3} style={{ padding: 0, margin: 0 }} >
          <div className={classes.right}>
            you need to complete your profile
            <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
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
        </Grid>
        <Grid item xs={12} md={9} style={{ padding: 0, margin: 0 }}>
          <div className={classes.left}>
            <form onSubmit={handelSubmit}>
              {getStepContent(activeStep)}
            </form>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>Back</Button>
              {activeStep !== (steps.length - 2) ?
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                  disabled={(activeStep === 1) && Object.values(userData).map(value => typeof value === 'object' ? Array.isArray(value) ? !!value.length : !!value.subProfessions.length : !!value).indexOf(false) !== -1}
                >
                  Next
                  </Button>
                :
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSend}
                >
                  Send
                  </Button>
              }
            </div>
          </div>
        </Grid>
      </Grid>
    </div>


  )
}
export default FirstProfile;