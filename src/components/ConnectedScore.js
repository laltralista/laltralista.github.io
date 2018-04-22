import React, { Component } from 'react';
import { connect } from "react-redux";
// import { addPointReducer } from '../store.js'

const mapStateToProps = (state) => ({state: state});
const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: () => dispatch({type: 'ADD_POINT', payload: {id: 26}})
  };
};

const Score = (props) => <div>
Score
<br/>
{props.state[0].points_count}
<button onClick={props.handleClick}>+1 a caso</button>
</div>


export default connect(mapStateToProps, mapDispatchToProps)(Score);
