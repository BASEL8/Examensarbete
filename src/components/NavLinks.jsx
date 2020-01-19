import React from 'react';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  hide: {
    display: 'none',
  },
  list: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 700,
    margin: '0 5px'
  }
}));


const NavLinks = ({ handleDrawerOpen, open }) => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.list}>
        <Link className={classes.link} to={"/"}>Talents</Link>
        <Link className={classes.link} to={"/company"}>Companies</Link>
        <Link className={classes.link} to={"/register"}>Register</Link>
        <Button variant="outlined" color="inherit">
          <Link className={classes.link} to={"/login"}>login</Link>
        </Button>

      </div>
      <Divider orientation="vertical" />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={handleDrawerOpen}
        className={clsx(open && classes.hide)}
      >
        <SettingsIcon />
      </IconButton>
    </>
  )
}
export default NavLinks;