import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SearchIcon from '@material-ui/icons/Search';
import BlockIcon from '@material-ui/icons/Block';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import MessageIcon from '@material-ui/icons/Message';
import CompanyTabProfile from './CompanyTabProfile'
import ContactedByYou from './ContactedByYou'
import { isAuth, getCookie } from '../../../actions/auth'
import { getCompanyProfile } from '../../../actions/companyAuth'
import { useHistory } from 'react-router-dom'
import AcceptedYouRequest from './AcceptedYouRequest';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.background,
    display: 'flex',
    minHeight: '90vh',
    '& .MuiTypography-root': {
      flex: 1
    },
    '& .MuiBox-root': {
      margin: 20,
      marginLeft: 0,
      borderRadius: 10,
      background: 'white',
      minHeight: '90%'
    },
    '& .MuiTabs-root': {
      border: 'none',
      flexShrink: 0,
    },
    '& .MuiTabs-flexContainer': {
      background: theme.palette.primary.main,
      padding: '20px 10px',
      borderRadius: 10,
      margin: '23px 20px',
      width: 60,
      justifyContent: 'center',
      boxShadow: '0px 2px 1px 1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
    },
    '& .MuiTabs-scroller': {
      display: 'flex',
      justifyContent: 'stretch',
      alignItems: 'flex-start',
      overflow: 'hidden'
    },
    '& .MuiTabs-indicator': {
      width: 108,
      borderTopLeftRadius: 300,
      borderBottomLeftRadius: 300,
      background: 'white',
      right: -33,

      '&:before': {
        zIndex: 999,
        content: '""',
        position: 'absolute',
        top: -34,
        right: 33,
        width: 44,
        height: 34,
        borderRadius: '50%',
        boxShadow: `18px 20px 4px 0 white`
      },
      '&:after': {
        zIndex: 999,
        content: '""',
        position: 'absolute',
        bottom: -32,
        right: 33,
        width: 44,
        height: 34,
        borderRadius: '50%',
        boxShadow: `18px -20px 4px 0 white`
      }
    },
    '& .MuiButtonBase-root': {
      minWidth: 'unset',
      zIndex: 9999
    }
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    zIndex: 999
  },
}));

const Main = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [user, setUserData] = useState({})
  const history = useHistory()
  const [error, setError] = useState('');
  const [forceUpdate, setForceUpdate] = useState(false)
  useEffect(() => {
    if (!isAuth()) {
      history.push('/')
    }
    getCompanyProfile(getCookie('token')).then(res => {
      if (res.error) {
        return setError(res.error)
      } else {
        setError('')
        setUserData({ ...res.company, announces: res.announces })
      }
    })
  }, [history, value, forceUpdate])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label={value !== 0 ? <AccountCircleOutlinedIcon fontSize='small' style={{ color: 'white', opacity: 1 }} /> : <AccountCircleIcon fontSize='small' color={"primary"} />} {...a11yProps(0)} />
          <Tab label={value !== 1 ? <MessageOutlinedIcon fontSize='small' style={{ color: 'white', opacity: 1 }} /> : <MessageIcon fontSize='small' color={"primary"} />} {...a11yProps(1)} />
          <Tab label={value !== 2 ? <DoneOutlineIcon fontSize='small' style={{ color: 'white', opacity: 1 }} /> : <DoneOutlinedIcon fontSize='small' color={"primary"} />} {...a11yProps(2)} />
          <Tab label={value !== 3 ? <SearchOutlinedIcon fontSize='small' style={{ color: 'white', opacity: 1 }} /> : <SearchIcon fontSize='small' color={"primary"} />} {...a11yProps(3)} />
          <Tab label={value !== 4 ? <BlockOutlinedIcon fontSize='small' style={{ color: 'white', opacity: 1 }} /> : <BlockIcon fontSize='small' color={"primary"} />} {...a11yProps(4)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <CompanyTabProfile
            user={user}
            setError={setError}
            forceUpdate={forceUpdate}
            setForceUpdate={setForceUpdate}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ContactedByYou
            contactedByYou={user.contactedByYou}
            wantToContactYou={user.wantToContactYou}
            forceUpdate={forceUpdate}
            setForceUpdate={setForceUpdate} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AcceptedYouRequest
            acceptedYouRequest={user.acceptedYourRequest}
            setForceUpdate={setForceUpdate}
            forceUpdate={forceUpdate} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          search
      </TabPanel>
        <TabPanel value={value} index={4}>
          blocked
      </TabPanel>
      </div>
    </>
  )
}

export default Main;