import React from 'react';
import { Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    background: theme.palette.primary.background,
    minHeight: 150,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10
  }
}));
const CompaniesYouAccepted = ({ acceptedByYou }) => {
  const classes = useStyles()
  return (<div>
    {acceptedByYou && acceptedByYou.map(({ companyName, _id, profession, city }, index) =>
      <Paper key={_id} className={classes.paper}>

        <div className={classes.text}>
          <h4>{companyName}</h4>
          <p>{profession.name}</p>
          <p>{profession && profession.subProfessions.map(({ name }) => name).join(', ')}</p>
          <p> {city}</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" color="secondary" >cancel</Button>
          </div>
        </div>
      </Paper>
    )
    }
  </div >)
}
export default CompaniesYouAccepted;