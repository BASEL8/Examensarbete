import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Home from './Home'
import User from './user'
import Company from './company'

const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/user" component={User} />
      <Route path="/company" component={Company} />
    </Switch>
  )
}
export default MainRouter;
