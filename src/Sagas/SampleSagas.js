import {call, put} from 'redux-saga/effects';
import {batch} from 'react-redux';
import SampleActions from '../Redux/SampleRedux';
import SessionActions from '../Redux/SessionRedux';
import NavigationServices from '../Navigation/NavigationServices';
import StoreHelper from '../Services/StoreHelper';
import moment from 'moment';

export function* SampleAction(api, {data}) {
  try {
    const response = yield call(api.getRoot);
    const currentDate = moment(new Date()).format('DD MM YYYY hh:mm A');
    // if (response.ok) {
    if (true) {
      batch(() => {
        StoreHelper.dispatch(
          SampleActions.actionSuccess({
            status: 'success'
          })
        );
        StoreHelper.dispatch(SessionActions.setLoginInfo(true, currentDate));
      });
      NavigationServices.setRootMain();
    } else {
      throw response;
    }
  } catch (error) {
    console.tron.error({err: error.message});
    yield put(SampleActions.actionFailure());
  }
}

export function* SampleReset() {
  yield put(SessionActions.resetStore());
  NavigationServices.setRootAuth();
}
