import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useLocation, useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { isAuth, signout } from '../actions/auth'
const useStyles = makeStyles(theme => ({
  hide: {
    display: 'none',
  },
  list: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 700,
    margin: '0 15px'
  }
}));


const NavLinks = ({ handleDrawerOpen, open }) => {
  const classes = useStyles()
  const [auth, setAuth] = useState(isAuth())
  const location = useLocation()
  const history = useHistory()
  useEffect(() => {
    setAuth(isAuth())
  }, [location])
  return (
    <>
      <div className={classes.list}>
        <Link className={classes.link} to={"/"}>Talents</Link>
        <Link className={classes.link} to={"/company"}>Companies</Link>
        {!auth && <><Link className={classes.link} to={"/user/register"}>Register</Link>
          <Button variant="outlined" color="inherit" style={{ marginLeft: 20, marginRight: 20 }}>
            <Link className={classes.link} to={"/user/login"}>login</Link>
          </Button></>}

      </div>
      <Divider orientation="vertical" />
      {auth && <>
        <IconButton
          color="inherit"
          className={classes.link}
          onClick={() => signout(setAuth)}
        >
          <ExitToAppIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="open"
          edge="end"
          onClick={handleDrawerOpen}
          className={clsx(open && classes.hide)}
        >
          <SettingsIcon />
        </IconButton>
      </>
      }
    </>
  )
}
export default NavLinks;