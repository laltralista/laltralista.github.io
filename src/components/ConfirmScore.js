import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';

import { closeConfirmScore, scorePoint } from '../actions';


const ConfirmScore = ({
  open,
  handleClose,
  handleConfirm,
  person,
  word,
}) => {
  const actions = [
    <FlatButton
      label="No, annulla"
      primary
      onClick={handleClose}
    />,
    <RaisedButton
      label="Sì, segna!"
      primary
      onClick={() => {handleConfirm(person, word) && handleClose()}}
    />,
  ];

  return (
    <div>
      <Dialog
        title="Conferma"
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={handleClose}
      >
        Segna {word && word.name} a {person && person.name}?
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({ ...state.confirmScore });

const mapDispatchToProps = dispatch => ({
  handleClose: () => dispatch(closeConfirmScore()),
  handleConfirm: (person, word) => dispatch(scorePoint(person, word)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmScore);
