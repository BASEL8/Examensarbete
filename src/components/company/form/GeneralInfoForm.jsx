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
  const {
    about,
    website,
    createdBy,
    workingRemotely,
    city,
    profession
  } = userData;
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
    return setUserData({ ...userData, [event.target.name]: event.target.value.toLowerCase() })


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
  return (
    <>
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