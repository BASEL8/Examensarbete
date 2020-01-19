import React from 'react';
import { Link } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocationCityIcon from '@material-ui/icons/LocationCity';
const Links = ({ handleDrawerClose }) => {
  return (
    <>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon><AccountCircleIcon /></ListItemIcon>
          <ListItemText primary={<Link style={{ textDecoration: 'none', color: '#12133F' }} onClick={handleDrawerClose} to="/user">User</Link>} />
        </ListItem>
      </List>
      <List>
        <ListItem button>
          <ListItemIcon><LocationCityIcon /></ListItemIcon>
          <ListItemText primary={<Link style={{ textDecoration: 'none', color: '#12133F' }} onClick={handleDrawerClose} to="/company">Company</Link>} />
        </ListItem>
      </List>
      <Divider />
    </>

  )
}
export default Links;