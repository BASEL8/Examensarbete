import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: 350,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'stretch',
    flexDirection: 'column',
    background: 'white',
    zIndex: 99999999
  },
  formControl: {
    margin: theme.spacing(3),
    width: '100%'
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
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const GeneralInfoForm = ({ userData, setUserData }) => {
  const classes = useStyles()
  const { companyName,
    organisationNumber,
    about,
    website,
    createdBy,
    workingRemotely,
    city,
    profession
  } = userData;
  console.log(userData)
  const handleChange = (event) => {
    if (event.target.name === 'profession') {
      return setUserData({
        ...userData,
        profession: {
          years: 0, subProfessions: [],
          name: event.target.value
        }
      })
    }
    if (event.target.name === 'subProfession') {
      if (profession.subProfessions.map((ob, index) => ob.name).indexOf(event.target.value) === -1) {
        return setUserData({
          ...userData,
          profession: {
            ...profession, subProfessions: [...profession.subProfessions, { name: event.target.value }]
          }
        })
      } else {
        return setUserData({
          ...userData,
          profession: {
            ...profession,
            subProfessions: profession.subProfessions.filter((ob) => ob.name !== event.target.value)
          }
        })
      }
    }
    if (event.target.name === 'workingRemotely') {
      return setUserData({ ...userData, workingRemotely: event.target.value })
    }
    if (event.target.name === 'kindOfEmployment') {
      return setUserData({ ...userData, kindOfEmployment: event.target.value })
    }
    return setUserData({ ...userData, [event.target.name]: event.target.value })


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
  return (
    <>
      <TextField
        label="Company Name"
        name="companyName"
        value={companyName}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        label="organisation Number"
        name="organisationNumber"
        value={organisationNumber}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        label="website"
        name="website"
        value={website}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        label="this account Created By"
        value={createdBy}
        name="createdBy"
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        label="City"
        value={city}
        name="city"
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        label="About the company"
        multiline
        value={about}
        name="about"
        onChange={handleChange}
        rows="4"
        variant="outlined"
      />
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.radioTable}> Interested in working remotely</FormLabel>
        <RadioGroup aria-label="workingRemotely" name="workingRemotely" value={workingRemotely} onChange={handleChange} className={classes.radioGroup}>
          <FormControlLabel value={'yes'} control={<Radio color="primary" />} label={'Yes'} />
          <FormControlLabel value={'no'} control={<Radio color="primary" />} label={'No'} />
          <FormControlLabel value={'only remotely'} control={<Radio color="primary" />} label={'Only remotely'} />
        </RadioGroup>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>
          Profession</InputLabel>
        <Select
          value={profession.name}
          onChange={handleChange}
          name='profession'
        >
          {professions.map(({ name }, index) => <MenuItem key={index} value={name}>{name}</MenuItem>)}
        </Select>
      </FormControl>
      {profession.name &&
        <Autocomplete
          multiple
          autoSelect={true}
          options={subProfessions.filter((index) => index.profession === profession.name)}
          getOptionLabel={({ name }) => name}
          value={profession.subProfessions}
          name="subProfession"
          ChipProps={{ clickable: false, deleteIcon: <span></span> }}
          renderOption={({ name }) => (
            <>
              <Checkbox
                name="subProfession"
                color="primary"
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                onChange={handleChange}
                value={name}
                checked={profession.subProfessions.map((ob, index) => ob.name).indexOf(name) !== -1}
              />
              {name}
            </>
          )}
          style={{ width: 500 }}
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              label="Sub professions"
              fullWidth
            />
          )}
        />
      }
    </>
  )
}
export default GeneralInfoForm;