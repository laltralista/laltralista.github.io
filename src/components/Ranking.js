import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
// import LogLifecyle from 'react-log-lifecycle';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import { transparent } from 'material-ui/styles/colors';

import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import ContentAdd from 'material-ui/svg-icons/content/add';

import logo from '../images/logo.png';
// import { addPointReducer } from '../store.js'

import { setConfirmScore, crown } from '../actions';

const mapStateToProps = state => ({ ranking: state.ranking, words: state.words });

const mapDispatchToProps = dispatch => ({
  handleScorePoint: (person, word) => dispatch(setConfirmScore(person, word)),
  handleCrown: person => dispatch(crown(person)),
});

// const flags = {
  // If logType is set to keys then the props of the object being logged
  // will be written out instead of the whole object. Remove logType or
  // set it to anything except keys to have the full object logged.
  // logType: 'keys',
  // A list of the param "types" to be logged.
  // The example below has all the types.
  // names: ['props', 'nextProps', 'nextState', 'prevProps', 'prevState']
// };

class Ranking extends Component {
  state = {
    openId: null
  }

  handleToggle = (id) => {
    this.setState(({ openId }) => {
      if (id === openId) {
        return { openId: null }
      } else {
        return { openId: id }
      }
    })

    return true
  }

  render() {
    return (
      <List style={{padding: 0}}>
        {this.props.ranking.map(rank =>
          <ListItem
            key={rank.person.id}
            primaryText={rank.person.name}
            insetChildren={true}
            leftAvatar={<Avatar color='#007bff' backgroundColor={transparent}>{rank.points_count}</Avatar>}
            rightAvatar={<Avatar color='#007bff' backgroundColor={transparent} src={logo} />}
            innerDivStyle={{paddingLeft: '56px'}}
            primaryTogglesNestedList
            onClick={() => this.handleToggle(rank.person.id)}
            open={this.state.openId === rank.person.id}
            nestedItems={[
              <ListItem
                key={1}
                primaryText={`Incorona ${rank.person.name}`}
                onClick={() => this.handleToggle(rank.person.id) && this.props.handleCrown(rank.person)}
                leftIcon={<NavigationCheck />}
              />,
              ...this.props.words.map(word =>
                <ListItem
                  key={word.id}
                  primaryText={<span>Segna <b style={{color: '#007bff'}}>{word.name}</b> a {rank.person.name}</span>}
                  onClick={() => this.handleToggle(rank.person.id) && this.props.handleScorePoint(rank.person, word)}
                  leftIcon={<ContentAdd />}
                />
              )
            ]}
          />
        )}
      </List>
  )}
}



export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
