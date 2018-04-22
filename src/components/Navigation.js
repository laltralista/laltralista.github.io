import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import { withRouter } from 'react-router-dom';

import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionViewList from 'material-ui/svg-icons/action/view-list';
import ActionHistory from 'material-ui/svg-icons/action/history';

class Navigation extends Component {
  linkTo = (path) => {
    this.props.history.push(path)
  }

  getSelected = () => {
    switch (this.props.history.location.pathname) {
    case `${process.env.PUBLIC_URL}/history`:
      return 0
    case `${process.env.PUBLIC_URL}/ranking`:
      return 1
    case `${process.env.PUBLIC_URL}/score`:
      return 2
    default:
      return 1
    }
  }

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.getSelected()}>
          <BottomNavigationItem
            label="Storico"
            icon={<ActionHistory />}
            onClick={() => this.linkTo(`${process.env.PUBLIC_URL}/history`)}
          />
          <BottomNavigationItem
            label="Classifica"
            icon={<ActionViewList />}
            onClick={() => this.linkTo(`${process.env.PUBLIC_URL}/ranking`)}
          />
          <BottomNavigationItem
            label="Segna"
            icon={<ContentAdd />}
            onClick={() => this.linkTo(`${process.env.PUBLIC_URL}/score`)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default withRouter(Navigation);

