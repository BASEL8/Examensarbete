import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.jsx';
import { Router } from 'react-router-dom'
import {
  createBrowserHistory
} from 'history';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
export const history = createBrowserHistory();

const Main = () => {
  const outerTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#0E5BCB',
        background: '#f0f0f0',
        button: '#0AB349',
        dark: '#0844AB'
      },
      text: {
        primary: '#606770',
        light: '#fff'
      }
    },
  });
  return (
    <ThemeProvider theme={outerTheme}>
      <Router history={history}>
        <App />
      </Router>
    </ThemeProvider>
  )
}
ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
