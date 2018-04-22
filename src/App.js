import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Route, Switch, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';
// import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';

import logo from './images/logo.png';

// import ENDPOINT from './endpoint';
import { updateAll } from './actions';

import './App.css';
import Ranking from './components/Ranking';
import Score from './components/Score';
import History from './components/History';
import Navigation from './components/Navigation';


const mapStateToProps = state => ({ snackbar: state.snackbar });
const mapDispatchToProps = (dispatch) => {
  return {
    updateAll: () => dispatch(updateAll()),
    closeSnackbar: () => dispatch({ type: 'CLOSE_SNACKBAR' })
  };
};

class App extends Component {
  static propTypes = {
    updateAll: PropTypes.func.isRequired,
    closeSnackbar: PropTypes.func.isRequired,
    snackbar: PropTypes.any,
  }

  componentDidMount() {
    this.props.updateAll();
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <AppBar
            title="LALISTA"
            iconElementRight={<IconButton><NavigationRefresh /></IconButton>}
            onRightIconButtonClick={this.props.updateAll}
            iconStyleLeft={{margin: '0 0 -4px -24px' }}
            iconElementLeft={<img src={logo} height={64} alt='logo' />}
            // showMenuIconButton={false}
          />
        </div>

        <div className="main">
          <Switch>
            <Route path={`${process.env.PUBLIC_URL}/ranking`} component={Ranking}/>
            <Route path={`${process.env.PUBLIC_URL}/score`} component={Score}/>
            <Route path={`${process.env.PUBLIC_URL}/history`} component={History}/>
            <Route component={Ranking}/>
          </Switch>
        </div>

        <div className="footer">
          <Navigation />
        </div>
        <Snackbar
          style={{bottom: 56}}
          open={this.props.snackbar.open}
          message={this.props.snackbar.message}
          autoHideDuration={4000}
          onRequestClose={this.props.closeSnackbar}
        />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

