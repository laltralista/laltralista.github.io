import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
// import LogLifecyle from 'react-log-lifecycle';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

// import logo from './../logo.svg';
// import { addPointReducer } from '../store.js'

const mapStateToProps = state => ({ points: state.points || [] });

class History extends Component {
  static propTypes = {
    points: PropTypes.array.isRequired,
  }

  render() {
    return (
      <List style={{padding: 0}}>
        {this.props.points.map(point =>
          <ListItem
            key={point.id}
            primaryText={`${point.person.name} ha detto ${point.word.name}`}
            secondaryText={`Segnata alle ${moment(point.created_at).format('H:mm')} del ${moment(point.created_at).format('DD/MM')}`}
            // rightAvatar={<Avatar src={logo} />}
          />
        )}
      </List>
  )}
}

export default connect(mapStateToProps)(History);
