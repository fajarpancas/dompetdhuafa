import {fromJS, Map} from 'immutable';
import {createReducer, createActions} from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  actionRequest: ['data'],
  actionSuccess: ['payload'],
  actionFailure: null,
  reset: null
});

export const SampleTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Map({
  action: Map(
    fromJS({
      fetching: false,
      data: undefined,
      payload: undefined,
      error: undefined
    })
  )
});
/* ------------- Selectors ------------- */

export const SampleSelectors = {
  selectAction: (state) => state.getIn(['sample', 'action'])
};

/* ------------- Reducers ------------- */

export const actionRequestReducer = (state, {data}) => {
  return state.withMutations((s) =>
    s
      .setIn(['action', 'fetching'], fromJS(true))
      .setIn(['action', 'data'], fromJS(data))
  );
};

export const actionSuccessReducer = (state, {payload}) => {
  return state.withMutations((s) =>
    s
      .setIn(['action', 'fetching'], fromJS(false))
      .setIn(['action', 'data'], fromJS(undefined))
      .setIn(['action', 'error'], fromJS(undefined))
  );
};

export const actionFailureReducer = (state) => {
  return state.withMutations((s) =>
    s
      .setIn(['action', 'fetching'], fromJS(false))
      .setIn(['action', 'data'], fromJS(undefined))
      .setIn(['action', 'error'], fromJS(true))
  );
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACTION_REQUEST]: actionRequestReducer,
  [Types.ACTION_SUCCESS]: actionSuccessReducer,
  [Types.ACTION_FAILURE]: actionFailureReducer
});
