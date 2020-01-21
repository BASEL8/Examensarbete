import React, { useEffect, useState } from 'react';
import { isAuth } from '../../../actions/auth'
import { makeStyles } from '@material-ui/core/styles';
import { JsonWebTokenError } from 'jsonwebtoken';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: 10,
    }
  }
}))
const Confirm = ({ userData }) => {
  const [user] = useState(isAuth())
  const classes = useStyles()
  const {
    about,
    wantToWorkAs,
    cities,
    kindOfEmployment,
    salary,
    languages,
    lookingForJob,
    available,
    reasonToNewJob,
    workingRemotely,
    priorityBenefits,
    profession
  } = userData;
  return (
    <div className={classes.root}>
      <h4>Hello : {user.name}</h4>
      <h3>about : {about}</h3>
      <h3>want to work as :{wantToWorkAs}</h3>
      <h3>cities : {cities.join(',')}</h3>
      <h3>kind of employment : {kindOfEmployment}</h3>
      <h3>salary : {salary}</h3>
      <h3>languages : {languages.join(',')}</h3>
      <h3>looking for job : {lookingForJob}</h3>
      <h3>available from {available}</h3>
      <h3>reason to new job : {reasonToNewJob}</h3>
      <h3>working remotely : {workingRemotely}</h3>
      <h3>priority benefits :  {priorityBenefits.join(',')}</h3>
    </div>
  )
}
export default Confirm;