import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
// import { blue500, blue700 } from 'material-ui/styles/colors';

import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

injectTapEventPlugin();

// blue principale: #007bff
// FONT: boh, rubalo a daniel

const myTheme = {
  ...lightBaseTheme,
  palette: {
    ...lightBaseTheme.palette,
    primary1Color: '#007bff',
    primary2Color: '#007bff',
  }
}

// const basename = window.location.pathname.includes('lalista-react') ? '/lalista-react' : '/'
// console.log('basename', basename)
// `${process.env.PUBLIC_URL}/`

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(myTheme)}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

registerServiceWorker();

