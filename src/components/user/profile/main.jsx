import React from 'react';
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
import TabProfile from './TabProfile'
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
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    minHeight: '90vh',
    '& .MuiTypography-root': {
      flex: 1
    },
    '& .MuiTabs-root': {
      border: 'none',
      flexShrink: 0
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
      alignItems: 'flex-start'
    },
    '& .MuiTabs-indicator': {
      width: '55%',
      borderTopLeftRadius: '100%',
      borderBottomLeftRadius: '100%',
      background: 'white',
      right: 15,

      '&:before': {
        zIndex: 999,
        content: '""',
        position: 'absolute',
        top: -32,
        bottom: 0,
        right: 0,
        width: 40,
        height: 34,
        borderRadius: '50%',
        boxShadow: '17px 16px 4px 0 white'
      },
      '&:after': {
        zIndex: 999,
        content: '""',
        position: 'absolute',
        bottom: -32,
        right: 0,
        width: 40,
        height: 34,
        borderRadius: '50%',
        boxShadow: '17px -16px 4px 0 white'
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
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
        <Tab label={value !== 1 ? <DoneOutlineIcon fontSize='small' style={{ color: 'white', opacity: 1 }} /> : <DoneOutlinedIcon fontSize='small' color={"primary"} />} {...a11yProps(1)} />
        <Tab label={value !== 2 ? <SearchOutlinedIcon fontSize='small' style={{ color: 'white', opacity: 1 }} /> : <SearchIcon fontSize='small' color={"primary"} />} {...a11yProps(2)} />
        <Tab label={value !== 3 ? <BlockOutlinedIcon fontSize='small' style={{ color: 'white', opacity: 1 }} /> : <BlockIcon fontSize='small' color={"primary"} />} {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TabProfile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        contacted by
      </TabPanel>
      <TabPanel value={value} index={2}>
        search
      </TabPanel>
      <TabPanel value={value} index={3}>
        blocked
      </TabPanel>
    </div>
  )
}

export default Main;