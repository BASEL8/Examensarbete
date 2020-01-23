import React from 'react';
import TextField from '@material-ui/core/TextField';

const GeneralInfoForm = ({ userData, setUserData }) => {
  const { companyName,
    organisationNumber,
    about,
    website,
    createdBy,
    city
  } = userData;
  const handleChange = event => {
    setUserData({ ...userData, [event.target.name]: event.target.value })
  };
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
    </>
  )
}
export default GeneralInfoForm;