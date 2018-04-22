import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

// import ENDPOINT from '../endpoint';
import { scorePoint } from '../actions';

const mapStateToProps = state => {
  return {
    people: state.people || [],
    words: state.words || []
  }
};

const mapDispatchToProps = dispatch => {
  return {
    scorePoint: (person, word) => dispatch(scorePoint(person, word)),
  };
};

class Score extends Component {
  static propTypes = {
    people: PropTypes.any.isRequired,
    words: PropTypes.any.isRequired,

    scorePoint: PropTypes.func.isRequired,
  }

  state = {
    person: null,
    word: null,
  }

  handleClick = () => {
    this.props.scorePoint(this.state.person, this.state.word)
    this.setState({ person: null, word: null })
  }

  render() {
    return (
        <React.Fragment>
          {!this.state.person &&
            <React.Fragment>
              <h2>Segna a...</h2>
              <Paper style={{margin: '30px'}}>
                <Menu style={{maxWidth: '100%', width: '100%'}}>
                  {(this.props.people).map((person) => (
                    <MenuItem
                      key={person.id}
                      checked={this.state.person && this.state.person.id === person.id}
                      primaryText={person.name}
                      onClick={() => this.setState({person})}
                    />
                  ))}
                </Menu>
              </Paper>
            </React.Fragment>
          }

          {this.state.person && !this.state.word &&
            <React.Fragment>
              <h2>Segna a</h2>
              <FlatButton
                primary
                onClick={() => this.setState({ person: null, word: null })}
                label={this.state.person.name} />
              <h2>la parola...</h2>
              <Paper style={{margin: '30px'}}>
                <Menu style={{maxWidth: '100%', width: '100%'}}>
                  {(this.props.words).map((word) => (
                    <MenuItem
                      key={word.id}
                      checked={this.state.word && this.state.word.id === word.id}
                      primaryText={word.name}
                      onClick={() => this.setState({word})}
                    />
                  ))}
                </Menu>
              </Paper>
            </React.Fragment>
          }

          {this.state.person && this.state.word &&
            <React.Fragment>
              <h2>Segna a</h2>
              <FlatButton
                primary
                onClick={() => this.setState({ person: null, word: null })}
                label={this.state.person.name} />
              <h2>la parola</h2>
              <FlatButton
                primary
                onClick={() => this.setState({ word: null })}
                label={this.state.word.name} />
              <Paper style={{margin: '30px'}}>
                <RaisedButton label="Sì, segna!" primary onClick={this.handleClick} fullWidth />
              </Paper>
            </React.Fragment>
          }
        </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Score);
