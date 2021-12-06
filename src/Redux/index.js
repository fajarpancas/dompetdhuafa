import {resettableReducer} from 'reduxsauce';
import rootSaga from '../Sagas/index';
import {combineReducers} from 'redux-immutable';
import configureStore from './CreateStore';
import StartupActions from '../Redux/StartupRedux';
import {SessionTypes} from '../Redux/SessionRedux';

const resettable = resettableReducer(SessionTypes.RESET_STORE);

export const reducers = combineReducers({
  sample: resettable(require('./SampleRedux').reducer),
  session: resettable(require('./SessionRedux').reducer)
});

export default () => {
  let finalReducers = reducers;

  let {store, sagasManager, sagaMiddleware} = configureStore(
    finalReducers,
    rootSaga
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require('../Sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas);
      });
    });
  }

  store.dispatch(StartupActions.startup());

  return store;
};
