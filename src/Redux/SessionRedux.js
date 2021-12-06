import {fromJS, Map} from 'immutable';
import {createReducer, createActions} from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  setLoginInfo: ['status', 'login_at'],
  resetStore: null,
  rehydrate: ['payload']
});

export const SessionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Map({
  isLoggedIn: fromJS(false),
  loggedAt: fromJS(null)
});
/* ------------- Selectors ------------- */

export const SessionSelectors = {
  getIsLoggedIn: (state) => state.getIn(['session', 'isLoggedIn']),
  getLoggedAt: (state) => state.getIn(['session', 'loggedAt'])
};

/* ------------- Reducers ------------- */

export const setLoginInfoReducer = (state, {status, login_at}) => {
  return state.withMutations((s) => {
    s.set('isLoggedIn', fromJS(status));
    s.set('loggedAt', fromJS(login_at));
  });
};

export const resetStore = (state) => {
  return state;
};

export const rehydrate = (state, {payload}) => {
  return payload.get('session');
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_LOGIN_INFO]: setLoginInfoReducer,
  [Types.RESET_STORE]: resetStore,
  [Types.REHYDRATE]: rehydrate
});
