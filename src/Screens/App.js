import '../Config';
import React, {Fragment, PureComponent} from 'react';
import REDUX_PERSIST from '../Config/ReduxPersist';
import splashscreen from '../Modules/splashscreen';
import {fcmService} from '../Services/FCMService';
import messaging from '@react-native-firebase/messaging';

class App extends PureComponent {
  componentDidMount() {
    this.requestUserPermission();
    this.FCMInit();
  }

  onRegister = (token) => {
    console.log('[NotificationFCM] onRegister: ', token);
  };

  onOpenNotification(notify) {
    console.log('[NotificationFCM] onOpenNotification: ', notify);
  }

  FCMInit = () => {
    fcmService.register(this.onRegister, this.onOpenNotification);
  };

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  render() {
    return <Fragment />;
  }
}

export default App;
