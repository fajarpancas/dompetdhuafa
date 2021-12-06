/* eslint-disable no-undef */
import {Navigation} from 'react-native-navigation';
import {put, select} from 'redux-saga/effects';
import NavigationServices from '../Navigation/NavigationServices';
import {SessionSelectors} from '../Redux/SessionRedux';
import splashscreen from '../Modules/splashscreen';

/**
 * This sagas will called at the first time when app lauch
 * this function used to thandle navigation, or any logic that required
 * at initial stattup such as get get user information, set token, navigation, etc
 * @param {*} action
 */
export function* startup(action) {
  const isLogin = yield select(SessionSelectors.getIsLoggedIn);
  splashscreen.hide();
  console.tron.error({isLogin});
  if (isLogin) {
    NavigationServices.setRootMain();
  } else {
    NavigationServices.setRootAuth();
  }
}
