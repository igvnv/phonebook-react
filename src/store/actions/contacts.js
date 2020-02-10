import { LoadingStates } from '../variables';
import Config from '../../components/Config';

export const SET_CONTACTS_FETCH_STATE = 'SET_CONTACTS_FETCH_STATE';
export const setContactsFetchState = (fetchingState) => ({
  type: SET_CONTACTS_FETCH_STATE,
  payload: fetchingState,
});

export const RECEIVE_CONTACTS_DATA = 'RECEIVE_CONTACTS_DATA';
export const receiveContactsData = (contacts) => ({
  type: RECEIVE_CONTACTS_DATA,
  payload: contacts,
});

// Fetches contacts from `Config.apiUrl`
//
// It can dispatch the actions:
//  - setContactsFetchState
//  - receiveContactsData
export const fetchContacts = () => async (dispatch) => {
  dispatch(setContactsFetchState(LoadingStates.LOADING));

  try {
    const response = await fetch(
      `${Config.apiUrl}/?results=${Config.numberCards}`
    );

    // Server returned a code other than 2xx
    if (!response.ok) {
      throw new Error(`Invalid answer from API: ${response.status}`);
    }

    const data = await response.json();

    // Error on API
    if (data.error) {
      throw new Error(data.error);
    }

    // Unexpected answer
    if (!data || !data.results || !Array.isArray(data.results)) {
      throw new Error('Invalid answer format from API');
    }

    // Everything is OK!
    dispatch(receiveContactsData(data.results));
    dispatch(setContactsFetchState(LoadingStates.DONE));
  } catch (e) {
    dispatch(setContactsFetchState(LoadingStates.ERROR));
    console.error(e);
  }
};

// Runs fetching process in case if it wasn't done successfully before
export const fetchContactsIfNeeded = () => (dispatch, getState) => {
  const { state } = getState().contacts;

  if (state === LoadingStates.DONE || state === LoadingStates.LOADING) {
    return null;
  }

  return dispatch(fetchContacts());
};
