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
      name: 'Technology & development',
      years: 0,
      subProfessions: []
    },
    {
      name: 'Design',
      years: 0,
      subProfessions: []
    },
    {
      name: 'Processer & Analys',
      years: 0,
      subProfessions: []
    }
  ]
  const subProfessions = [

    {
      name: 'System  Architect',
      years: 0,
      profession: 'Technology & development'
    },
    {
      name: 'System Admin',
      years: 0,
      profession: 'Technology & development'
    },
    {
      name: 'Games',
      years: 0,
      profession: 'Technology & development'
    },
    {
      name: 'Test',
      years: 0,
      profession: 'Technology & development'
    },
    {
      name: 'QA',
      years: 0,
      profession: 'Technology & development'
    },
    {
      name: 'IT Security',
      years: 0,
      profession: 'Technology & development'
    },
    {
      name: 'iOS',
      years: 0,
      profession: 'Technology & development'
    },
    {
      name: 'Hybrid',
      years: 0,
      profession: 'Technology & development'
    },
    {
      name: 'Electronics',
      years: 0,
      profession: 'Technology & development'
    },
    {
      name: 'Hardware',
      years: 0,
      profession: 'Technology & development'
    },
    {
      name: 'Full-stack',
      years: 0,
      profession: 'Technology & development'
    },
    {
      name: 'Front-end',
      years: 0,
      profession: 'Technology & development'
    },
    {
      name: 'Embedded',
      years: 0,
      profession: 'Technology & development'
    },
    {
      name: 'DevOps',
      years: 0,
      profession: 'Technology & development'
    },
    {
      name: 'Database',
      years: 0,
      profession: 'Technology & development'
    },
    {
      name: 'Data Science',
      years: 0,
      profession: 'Technology & development'
    },
    {
      name: 'Cloud',
      years: 0,
      profession: 'Technology & development'
    },
    {
      name: 'BI',
      years: 0,
      profession: 'Technology & development'
    },
    {
      name: 'Backend',
      years: 0,
      profession: 'Technology & development'
    },
    {
      name: 'Apps',
      years: 0,
      profession: 'Technology & development'
    },
    {
      name: 'Android',
      years: 0,
      profession: 'Technology & development'
    },
    {
      name: 'Animation',
      years: 0,
      profession: 'Design'
    },
    {
      name: 'Graphic design',
      years: 0,
      profession: 'Design'
    },
    {
      name: 'UI',
      years: 0,
      profession: 'Design'
    },
    {
      name: 'UX',
      years: 0,
      profession: 'Design'
    },
    {
      name: 'Visual design',
      years: 0,
      profession: 'Design'
    },
    {
      name: 'business Developer',
      years: 0,
      profession: 'Processer & Analys'
    },
    {
      name: 'business Architect',
      years: 0,
      profession: 'Processer & Analys'
    },
    {
      name: 'business Analyst',
      years: 0,
      profession: 'Processer & Analys'
    },
    {
      name: 'System Administration',
      years: 0,
      profession: 'Processer & Analys'
    },
    {
      name: 'management Consultant',
      years: 0,
      profession: 'Processer & Analys'
    },
    {
      name: 'solution Architect',
      years: 0,
      profession: 'Processer & Analys'
    },
    {
      name: 'Requirements Analyst',
      years: 0,
      profession: 'Processer & Analys'
    },
    {
      name: 'Infrastructure',
      years: 0,
      profession: 'Processer & Analys'
    },
    {
      name: 'Growth',
      years: 0,
      profession: 'Processer & Analys'
    },
    {
      name: 'Data Analyst',
      years: 0,
      profession: 'Processer & Analys'
    },
    {
      name: 'application',
      years: 0,
      profession: 'Processer & Analys'
    },
  ];
  const reasons = [
    "no special reason",
    "I want higher wages",
    "I will move to another city",
    "I'm looking for other or better benefits",
    "I want more responsibility",
    "I want to be challenged more",
    "I want to deepen my knowledge of existing skills",
    "I want to learn new skills or skills",
    "I want to work with something that matches my values",
    "I want to work with a company that has a corporate culture that suits me",
    "I want a better work - life balance",
    "I want to be able to work more flexibly",
    "I want to work in another industry",
    "I want to work for a certain type of company",
    "I want to work with other types of assignments",
  ]
  const benefits = [
    "Allergy - adapted office"
    , "Workplace not located in office landscape"
    , "Allocated time for further education"
    , "Balance between leisure and work"
    , "Car"
    , "bonus Model"
    , "Central office"
    , "Partnership"
    , "Own responsibility"
    , "Not interested in probation"
    , "Extra parental allowance"
    , "Fixed salary"
    , "Flexible working hours"
    , "trust Working"
    , "Freedom at work"
    , "wellness Contributions"
    , "health Insurance"
    , "Pets are allowed"
    , "career Opportunities"
    , "Koddagar"
    , "Collective agreements"
    , "Competitive salary"
    , "More than 25 days of vacation"
    , "Ability to work from home"
    , "Possibility to choose own equipment"
    , "Opportunity to work abroad"
    , "New technique"
    , "Want customer contact"
    , "Variable salary"
    , "Health insurance"
    , "Stable working situation"
    , "dental Insurance"
    , "Access to shower"
    , "Access to gym"
    , "Occupational"
    , "Extended support for parental leave"
    , "development Opportunities"
    , "Just want to work in -house"
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