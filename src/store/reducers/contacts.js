import {
  SET_CONTACTS_FETCH_STATE,
  RECEIVE_CONTACTS_DATA,
} from '../actions/contacts';
import { LoadingStates } from '../variables';

const initialState = {
  data: [],
  state: LoadingStates.PRISTINE,
};

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACTS_FETCH_STATE:
      return { ...state, ...{ state: action.payload } };

    case RECEIVE_CONTACTS_DATA:
      return { ...state, ...{ data: action.payload } };

    default:
      return state;
  }
};

export default contactsReducer;
