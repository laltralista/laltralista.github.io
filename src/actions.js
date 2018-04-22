import localforage from 'localforage';
import moment from 'moment';

import ENDPOINT from './endpoint';

export const update = (what, api) => async (dispatch) => {
  let localJson;
  let response;
  let json;

  try {
    localJson = await localforage.getItem(what.toLowerCase());
  } catch (e) {
    dispatch({ type: 'LOCALFORAGE_FAILED' });
  }

  if (localJson) {
    dispatch({ type: `UPDATE_${what.toUpperCase()}`, payload: localJson });
  }

  try {
    response = await fetch(`${ENDPOINT}${api}`);
    json = await response.json();
  } catch (e) {
    dispatch({ type: 'FETCH_FAILED' });
    return;
  }

  try {
    localforage.setItem(what.toLowerCase(), json);
  } catch (e) {
    dispatch({ type: 'LOCALFORAGE_FAILED' });
  }

  dispatch({ type: `UPDATE_${what.toUpperCase()}`, payload: json });
};

export const updateAll = () => (dispatch) => {
  dispatch(update('ranking', '/people/ranking'));
  dispatch(update('people', '/people'));
  dispatch(update('words', '/words'));
  dispatch(update('points', '/points'));
};

export const scorePoint = (person, word) => async (dispatch) => {
  const createdAt = moment();
  const point = {
    id: `${person.id}_${word.id}_${createdAt}`,
    person_id: person.id,
    word_id: word.id,
    person,
    word,
    created_at: createdAt,
  };
  dispatch({ type: 'SCORE_POINT', payload: { point } });

  let response;
  let json;
  try {
    response = await fetch(`${ENDPOINT}/points`, {
      body: JSON.stringify({ person_id: person.id, word_id: word.id }),
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    });
    json = await response.json();
  } catch (e) {}

  if (!response || !response.ok) {
    dispatch({ type: 'FETCH_FAILED' });
    dispatch({ type: 'SCORE_POINT_ROLLBACK', payload: { point } });
    return;
  }

  dispatch({ type: 'SCORE_POINT_COMMIT', payload: { point: json, oldPoint: point } });
};

export const closeConfirmScore = () => (dispatch) => {
  dispatch({ type: 'TOGGLE_CONFIRM_SCORE', payload: false });
};

export const openConfirmScore = () => (dispatch) => {
  dispatch({ type: 'TOGGLE_CONFIRM_SCORE', payload: true });
};

export const setConfirmScore = (person, word) => (dispatch) => {
  dispatch({ type: 'SET_CONFIRM_SCORE', payload: { person, word } });
};

export const crown = person => async (dispatch) => {
  dispatch({ type: 'CROWN_LOADING', payload: person });

  let response;
  // let json;
  try {
    response = await fetch(`${ENDPOINT}/winners`, {
      body: JSON.stringify({ winner: { person_id: person.id } }),
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    });
    // json = await response.json();
  } catch (e) {}

  if (!response || !response.ok) {
    dispatch({ type: 'CROWN_FAILED', payload: person });
    return;
  }

  dispatch({ type: 'CROWN', payload: person });

  dispatch(update('ranking', '/people/ranking'));
};

  // handleClick = () => {
  //   if (!this.state.person || !this.state.word) return
  //   const personId = this.state.person.id
  //   this.props.addPoint(personId)
  //   this.props.snackbarMessage(`segnando...`);

  //   this.setState({
  //     person: null,
  //     word: null,
  //   })

  //     .then(response => {
  //       console.log(response)
  //       if (!response.ok) {
  //         this.props.removePoint(personId)
  //         console.log("ERRORE!")
  //         this.props.snackbarMessage(`errore, riprova`);
  //       return
  //       }
  //       response.json()
  //     })
  //     .then((json) => {
  //       console.log(json)
  //       this.props.snackbarMessage(`segnato`);
  //     })
  //     .catch(what => {
  //       this.props.removePoint(personId)
  //       this.props.snackbarMessage(`errore, riprova`);
  //       console.log('what', what)
  //     });
  // }
