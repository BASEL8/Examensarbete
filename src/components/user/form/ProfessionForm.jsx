import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { FormGroup } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
  radioTable: {
    margin: '15px 0'
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    '&>*': {
      flexBasis: '25%',
      [theme.breakpoints.down('sm')]: {
        flexBasis: 30,
      }
    }
  }
}));

const ProfessionForm = ({ setUserData, userData }) => {
  const classes = useStyles()

  const { reasonToNewJob, workingRemotely, priorityBenefits, profession } = userData;
  const handleChange = (event) => {
    if (event.target.name === 'profession') {
      setUserData({
        ...userData,
        profession: {
          years: 0, subProfessions: [],
          name: event.target.value
        }
      })
    }
    if (event.target.name === 'subProfession') {
      if (profession.subProfessions.map((ob, index) => ob.name).indexOf(event.target.value) === -1) {
        setUserData({
          ...userData,
          profession: {
            ...profession, subProfessions: [...profession.subProfessions, { name: event.target.value }]
          }
        })
      } else {
        setUserData({
          ...userData,
          profession: {
            ...profession,
            subProfessions: profession.subProfessions.filter((ob) => ob.name !== event.target.value)
          }
        })
      }
    }
    if (event.target.name === 'reasonToNewJob') {
      setUserData({ ...userData, reasonToNewJob: event.target.value })
    }
    if (event.target.name === 'workingRemotely') {
      setUserData({ ...userData, workingRemotely: event.target.value })
    }
    if (event.target.name === 'priorityBenefits') {
      if (priorityBenefits.indexOf(event.target.value) === -1 && priorityBenefits.length <= 8) {
        setUserData({ ...userData, priorityBenefits: [...priorityBenefits, event.target.value] })
      }
      else {
        setUserData({ ...userData, priorityBenefits: priorityBenefits.filter(b => b !== event.target.value) })
      }
    }
  }
  const professions = [
    {
      name: 'technology & development',
      years: 0,
      subProfessions: []
    },
    {
      name: 'design',
      years: 0,
      subProfessions: []
    },
    {
      name: 'processer & analys',
      years: 0,
      subProfessions: []
    }
  ]
  const subProfessions = [

    {
      name: 'system  Architect',
      years: 0,
      profession: 'technology & development'
    },
    {
      name: 'system Admin',
      years: 0,
      profession: 'technology & development'
    },
    {
      name: 'games',
      years: 0,
      profession: 'technology & development'
    },
    {
      name: 'test',
      years: 0,
      profession: 'technology & development'
    },
    {
      name: 'qa',
      years: 0,
      profession: 'technology & development'
    },
    {
      name: 'iT Security',
      years: 0,
      profession: 'technology & development'
    },
    {
      name: 'iOS',
      years: 0,
      profession: 'technology & development'
    },
    {
      name: 'hybrid',
      years: 0,
      profession: 'technology & development'
    },
    {
      name: 'electronics',
      years: 0,
      profession: 'technology & development'
    },
    {
      name: 'hardware',
      years: 0,
      profession: 'technology & development'
    },
    {
      name: 'full-stack',
      years: 0,
      profession: 'technology & development'
    },
    {
      name: 'front-end',
      years: 0,
      profession: 'technology & development'
    },
    {
      name: 'embedded',
      years: 0,
      profession: 'technology & development'
    },
    {
      name: 'devOps',
      years: 0,
      profession: 'technology & development'
    },
    {
      name: 'database',
      years: 0,
      profession: 'technology & development'
    },
    {
      name: 'data science',
      years: 0,
      profession: 'technology & development'
    },
    {
      name: 'cloud',
      years: 0,
      profession: 'technology & development'
    },
    {
      name: 'bi',
      years: 0,
      profession: 'technology & development'
    },
    {
      name: 'backend',
      years: 0,
      profession: 'technology & development'
    },
    {
      name: 'apps',
      years: 0,
      profession: 'technology & development'
    },
    {
      name: 'android',
      years: 0,
      profession: 'technology & development'
    },
    {
      name: 'animation',
      years: 0,
      profession: 'design'
    },
    {
      name: 'graphic design',
      years: 0,
      profession: 'design'
    },
    {
      name: 'ui',
      years: 0,
      profession: 'design'
    },
    {
      name: 'ux',
      years: 0,
      profession: 'design'
    },
    {
      name: 'visual design',
      years: 0,
      profession: 'design'
    },
    {
      name: 'business developer',
      years: 0,
      profession: 'processer & analys'
    },
    {
      name: 'business architect',
      years: 0,
      profession: 'processer & analys'
    },
    {
      name: 'business Analyst',
      years: 0,
      profession: 'processer & analys'
    },
    {
      name: 'system administration',
      years: 0,
      profession: 'processer & analys'
    },
    {
      name: 'management consultant',
      years: 0,
      profession: 'processer & analys'
    },
    {
      name: 'solution architect',
      years: 0,
      profession: 'processer & analys'
    },
    {
      name: 'requirements analyst',
      years: 0,
      profession: 'processer & analys'
    },
    {
      name: 'infrastructure',
      years: 0,
      profession: 'processer & analys'
    },
    {
      name: 'growth',
      years: 0,
      profession: 'processer & analys'
    },
    {
      name: 'data analyst',
      years: 0,
      profession: 'processer & analys'
    },
    {
      name: 'application',
      years: 0,
      profession: 'processer & analys'
    },
  ];
  const reasons = [
    "no special reason",
    "i want higher wages",
    "i will move to another city",
    "i'm looking for other or better benefits",
    "i want more responsibility",
    "i want to be challenged more",
    "i want to deepen my knowledge of existing skills",
    "i want to learn new skills or skills",
    "i want to work with something that matches my values",
    "i want to work with a company that has a corporate culture that suits me",
    "i want a better work - life balance",
    "i want to be able to work more flexibly",
    "i want to work in another industry",
    "i want to work for a certain type of company",
    "i want to work with other types of assignments",
  ]
  const benefits = [
    "allergy - adapted office"
    , "workplace not located in office landscape"
    , "allocated time for further education"
    , "balance between leisure and work"
    , "car"
    , "bonus Model"
    , "central office"
    , "partnership"
    , "own responsibility"
    , "not interested in probation"
    , "extra parental allowance"
    , "fixed salary"
    , "flexible working hours"
    , "trust Working"
    , "freedom at work"
    , "wellness Contributions"
    , "health Insurance"
    , "pets are allowed"
    , "career Opportunities"
    , "collective agreements"
    , "competitive salary"
    , "more than 25 days of vacation"
    , "ability to work from home"
    , "possibility to choose own equipment"
    , "opportunity to work abroad"
    , "new technique"
    , "want customer contact"
    , "variable salary"
    , "health insurance"
    , "stable working situation"
    , "dental Insurance"
    , "access to shower"
    , "access to gym"
    , "occupational"
    , "extended support for parental leave"
    , "development Opportunities"
    , "just want to work in -house"
  ]
  return (
    <>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.radioTable}>Profession</FormLabel>
        <RadioGroup aria-label="profession" name="profession" value={profession.name} onChange={handleChange} className={classes.radioGroup}>
          {professions.map(({ name }, index) => <FormControlLabel key={index} value={name} control={<Radio color="primary" />} label={name} />)}

        </RadioGroup>
      </FormControl>
      <FormGroup className={classes.checkbox}>
        {profession.name && subProfessions.filter((index) => index.profession === profession.name).map(({ name }, index) =>
          <FormControlLabel
            control={
              <Checkbox
                name="subProfession"
                checked={profession.subProfessions.map((ob, index) => ob.name).indexOf(name) !== -1}
                onChange={handleChange}
                value={name}
                color="primary"
              />
            }
            key={index}
            label={name}
          />
        )}
      </FormGroup>
      <FormControl className={classes.formControl} style={{ width: '100%' }}>
        <InputLabel>
          Reason why you should consider a new job</InputLabel>
        <Select
          id="demo-simple-select"
          value={reasonToNewJob}
          onChange={handleChange}
          name='reasonToNewJob'
        >
          {reasons.map((reason, index) => <MenuItem key={index} value={reason}>{reason}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.radioTable}> Interested in working remotely</FormLabel>
        <RadioGroup aria-label="workingRemotely" name="workingRemotely" value={workingRemotely} onChange={handleChange} className={classes.radioGroup}>
          <FormControlLabel value={'yes'} control={<Radio color="primary" />} label={'Yes'} />
          <FormControlLabel value={'no'} control={<Radio color="primary" />} label={'No'} />
          <FormControlLabel value={'only remotely'} control={<Radio color="primary" />} label={'Only remotely'} />
        </RadioGroup>
      </FormControl>
      <FormGroup className={classes.checkbox}>
        {benefits.map((name, index) => <FormControlLabel
          control={
            <Checkbox
              name="priorityBenefits"
              checked={priorityBenefits.indexOf(name) !== -1}
              onChange={handleChange}
              value={name}
              color="primary"
              disabled={priorityBenefits.length === 8 && priorityBenefits.indexOf(name) === -1}
            />
          }
          key={index}
          label={name}
        />

        )}
      </FormGroup>
    </>
  )
}
export default ProfessionForm