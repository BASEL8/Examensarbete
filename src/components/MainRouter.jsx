import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Home from './Home'
import UserRegister from './user/UserRegister'
import UserLogin from './user/UserLogin'
import UserActivation from './user/UserActivation'
import UserProfile from './user/UserProfile'
import CompanyHome from './company/companyHome'
import CompanyRegister from './company/CompanyRegister'
import CompanyLogin from './company/CompanyLogin'
import CompanyActivation from './company/CompanyActivation'
import NotCompleteProfile from './user/NotCompleteProfile'
import CompanyNotComplete from './company/CompanyNotComplete'
import CompanyProfile from './company/CompanyProfile'
const MainRouter = () => {
  return (

    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/user/register" component={UserRegister} />
      <Route exact path="/user/login" component={UserLogin} />
      <Route exact path="/user/activation/:activationToken" component={UserActivation} />
      <Route exact path="/user/profile/:_id" component={UserProfile} />
      <Route exact path="/user/update/:_id" component={NotCompleteProfile} />
      <Route exact path="/company" component={CompanyHome} />
      <Route exact path="/company/register" component={CompanyRegister} />
      <Route exact path="/company/login" component={CompanyLogin} />
      <Route exact path="/company/activation/:activationToken" component={CompanyActivation} />
      <Route exact path="/company/update/:_id" component={CompanyNotComplete} />
      <Route exact path="/company/profile/:_id" component={CompanyProfile} />
    </Switch>
  )
}
export default MainRouter;
