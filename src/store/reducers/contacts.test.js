import reducer from './contacts';
import { LoadingStates } from '../variables';
import {
  SET_CONTACTS_FETCH_STATE,
  RECEIVE_CONTACTS_DATA,
} from '../actions/contacts';
import contactsList from '../../../__tests__/data/contacts';

const defaultState = {
  data: [],
  state: LoadingStates.PRISTINE,
};

describe('contacts reducer', () => {
  it('has initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it('sets fetch state', () => {
    expect(
      reducer(defaultState, {
        type: SET_CONTACTS_FETCH_STATE,
        payload: LoadingStates.DONE,
      })
    ).toEqual({ data: defaultState.data, state: LoadingStates.DONE });
  });

  it('sets contacts list', () => {
    expect(
      reducer(defaultState, {
        type: RECEIVE_CONTACTS_DATA,
        payload: contactsList,
      })
    ).toEqual({ data: contactsList, state: defaultState.state });
  });
});
