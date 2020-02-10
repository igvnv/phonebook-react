import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import apiContactsResponse from '../../../__tests__/responses/contacts';
import Config from '../../components/Config';
import contacts from '../../../__tests__/data/contacts';
import { LoadingStates } from '../variables';
import {
  SET_CONTACTS_FETCH_STATE,
  setContactsFetchState,
  RECEIVE_CONTACTS_DATA,
  receiveContactsData,
  fetchContacts,
  fetchContactsIfNeeded,
} from './contacts';

const mockStore = configureMockStore([thunk]);

describe('Contacts actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('setContactsFetchState action', () => {
    const state = LoadingStates.DONE;
    const expectedAction = {
      type: SET_CONTACTS_FETCH_STATE,
      payload: state,
    };

    expect(setContactsFetchState(state)).toEqual(expectedAction);
  });

  test('receiveContactsData action', () => {
    const data = contacts;
    const expectedAction = {
      type: RECEIVE_CONTACTS_DATA,
      payload: data,
    };

    expect(receiveContactsData(data)).toEqual(expectedAction);
  });

  test('fetchContacts action (successful)', async () => {
    fetchMock.getOnce(`${Config.apiUrl}/?results=${Config.numberCards}`, {
      headers: { 'content-type': 'application/json' },
      body: apiContactsResponse,
    });

    const expectedActions = [
      {
        type: SET_CONTACTS_FETCH_STATE,
        payload: LoadingStates.LOADING,
      },
      { type: RECEIVE_CONTACTS_DATA, payload: contacts },
      {
        type: SET_CONTACTS_FETCH_STATE,
        payload: LoadingStates.DONE,
      },
    ];

    const store = mockStore({
      contacts: { data: [], state: LoadingStates.PRISTINE },
    });

    await store.dispatch(fetchContacts());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchContacts action (server error)', async () => {
    fetchMock.getOnce(`${Config.apiUrl}/?results=${Config.numberCards}`, 500);

    const expectedActions = [
      {
        type: SET_CONTACTS_FETCH_STATE,
        payload: LoadingStates.LOADING,
      },
      {
        type: SET_CONTACTS_FETCH_STATE,
        payload: LoadingStates.ERROR,
      },
    ];

    const store = mockStore({
      contacts: { data: [], state: LoadingStates.PRISTINE },
    });

    await store.dispatch(fetchContacts());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchContacts action (service error)', async () => {
    fetchMock.getOnce(`${Config.apiUrl}/?results=${Config.numberCards}`, {
      headers: { 'content-type': 'application/json' },
      body: {
        error:
          'Uh oh, something has gone wrong. Please tweet us @randomapi about the issue. Thank you.',
      },
    });

    const expectedActions = [
      {
        type: SET_CONTACTS_FETCH_STATE,
        payload: LoadingStates.LOADING,
      },
      {
        type: SET_CONTACTS_FETCH_STATE,
        payload: LoadingStates.ERROR,
      },
    ];

    const store = mockStore({
      contacts: { data: [], state: LoadingStates.PRISTINE },
    });

    await store.dispatch(fetchContacts());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("fetchContactsIfNeeded fetches contacts when it wasn't run before", async () => {
    fetchMock.getOnce(`${Config.apiUrl}/?results=${Config.numberCards}`, {
      headers: { 'content-type': 'application/json' },
      body: apiContactsResponse,
    });

    const expectedActions = [
      {
        type: SET_CONTACTS_FETCH_STATE,
        payload: LoadingStates.LOADING,
      },
      { type: RECEIVE_CONTACTS_DATA, payload: contacts },
      {
        type: SET_CONTACTS_FETCH_STATE,
        payload: LoadingStates.DONE,
      },
    ];

    const store = mockStore({
      contacts: { data: [], state: LoadingStates.PRISTINE },
    });

    await store.dispatch(fetchContactsIfNeeded());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("fetchContactsIfNeeded doesn't fetch contacts when they were loaded before", async () => {
    fetchMock.getOnce(`${Config.apiUrl}/?results=${Config.numberCards}`, {
      headers: { 'content-type': 'application/json' },
      body: apiContactsResponse,
    });

    const store = mockStore({
      contacts: { data: [], state: LoadingStates.DONE },
    });

    await store.dispatch(fetchContactsIfNeeded());
    expect(store.getActions().length).toEqual(0);
  });

  test("fetchContactsIfNeeded doesn't fetch contacts if loading in process", async () => {
    fetchMock.getOnce(`${Config.apiUrl}/?results=${Config.numberCards}`, {
      headers: { 'content-type': 'application/json' },
      body: apiContactsResponse,
    });

    const store = mockStore({
      contacts: { data: [], state: LoadingStates.LOADING },
    });

    await store.dispatch(fetchContactsIfNeeded());
    expect(store.getActions().length).toEqual(0);
  });

  test('fetchContactsIfNeeded fetches contacts after error', async () => {
    fetchMock.getOnce(`${Config.apiUrl}/?results=${Config.numberCards}`, {
      headers: { 'content-type': 'application/json' },
      body: apiContactsResponse,
    });

    const expectedActions = [
      {
        type: SET_CONTACTS_FETCH_STATE,
        payload: LoadingStates.LOADING,
      },
      { type: RECEIVE_CONTACTS_DATA, payload: contacts },
      {
        type: SET_CONTACTS_FETCH_STATE,
        payload: LoadingStates.DONE,
      },
    ];

    const store = mockStore({
      contacts: { data: [], state: LoadingStates.ERROR },
    });

    await store.dispatch(fetchContactsIfNeeded());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
