import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { useTheme } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';


const getStyles = (name, personName, theme) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const GeneralInfoForm = () => {
  const theme = useTheme();
  const [UserInfo, setUSerInfo] = useState({
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
    priorityBenefits: []
  });
  const { about, wantToWorkAs, cities, kindOfEmployment, salary, languages, lookingForJob, available } = UserInfo;
  const handleChange = event => {
    setUSerInfo({ ...UserInfo, [event.target.name]: event.target.value });
  };
  return (
    <>
      <TextField
        label="What do you want to work as "
        name="wantToWorkAs"
        value={wantToWorkAs}
        onChange={handleChange}
        variant="outlined"
      />
      <FormControl>
        <InputLabel id="city"> In which cities want to be located</InputLabel>
        <Select
          labelId="city"
          multiple
          value={cities}
          name="cities"
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
          renderValue={selected => (
            <div >
              {selected.map(value => (
                <Chip key={value} label={value} />
              ))}
            </div>
          )}
        >
          {names.map(name => (
            <MenuItem key={name} value={name} style={getStyles(name, cities, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend"> Kind of employment</FormLabel>
        <RadioGroup
          name="kindOfEmployment"
          value={kindOfEmployment}
          onChange={handleChange}>
          <FormControlLabel value="employment" control={<Radio />} label="Employment" />
          <FormControlLabel value="freelance" control={<Radio />} label="Freelance" />
        </RadioGroup>
      </FormControl>
      <TextField
        label="Desired monthly salary "
        name="salary"
        value={salary}
        onChange={handleChange}
        variant="outlined"
        type="number"
      />
      <FormControl>
        <InputLabel id="city">Languages</InputLabel>
        <Select
          labelId="city"
          multiple
          value={languages}
          name="languages"
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
          renderValue={selected => (
            <div >
              {selected.map(value => (
                <Chip key={value} label={value} />
              ))}
            </div>
          )}
        >
          {names.map(name => (
            <MenuItem key={name} value={name} style={getStyles(name, cities, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Looking for job</FormLabel>
        <RadioGroup
          name="lookingForJob"
          value={lookingForJob}
          onChange={handleChange}>
          <FormControlLabel value="notLooking" control={<Radio />} label="Not looking for an active job but open to suggestions" />
          <FormControlLabel value="looking" control={<Radio />} label="Looking for an active job" />
          <FormControlLabel value="notInterested" control={<Radio />} label="Not interested in changing my job" />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">when are you available for a new assignment or employment </FormLabel>
        <RadioGroup
          name="available"
          value={available}
          onChange={handleChange}>
          <FormControlLabel value="immediately" control={<Radio />} label="Immediately" />
          <FormControlLabel value="within2weeks" control={<Radio />} label="Within 2 weeks" />
          <FormControlLabel value="oneMonth" control={<Radio />} label="One month" />
          <FormControlLabel value="twoMonth" control={<Radio />} label="Two month" />
          <FormControlLabel value="threeMonths" control={<Radio />} label="Three months" />
          <FormControlLabel value="moreThanThreeMonths" control={<Radio />} label="More than three months" />

          <TextField
            id="date"
            label="At a specific date"
            type="date"
            defaultValue="2020-01-10"
            name="available"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </RadioGroup>
      </FormControl>
      <TextField
        label="About you"
        multiline
        value={about}
        name="about"
        onChange={handleChange}
        rows="4"
        variant="outlined"
      />
    </>
  )
}
export default GeneralInfoForm;