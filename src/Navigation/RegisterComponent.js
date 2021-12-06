import React from 'react';
import {Navigation} from 'react-native-navigation';
import App from '../Screens/App';
import LoginScreen from '../Screens/Auth/LoginScreen';
import RegisterScreen from '../Screens/Auth/RegisterScreen';
import MainScreen from '../Screens/Main/MainScreen';
import SettingScreen from '../Screens/Main/SettingScreen';
import ModalScreen from '../Screens/Main/ModalScreen';
import Alert from '../Components/Alert';
import Toast from '../Components/Toast';
import ReduxWrapper from './ReduxWrapper';

export const NAVIGATION_NAME = {
  APP: 'app',
  AUTH: {
    login: 'auth.login',
    register: 'auth.register'
  },
  MAIN: {
    main: 'main.main',
    setting: 'main.setting',
  },
  COMPONENTS: {
    modal: 'component.modal',
    alert: 'component.alert',
    toast: 'component.toast',
  }
};

export default function () {
  Navigation.registerComponent(NAVIGATION_NAME.APP, () => ReduxWrapper(App));
  Navigation.registerComponent(NAVIGATION_NAME.AUTH.login, () =>
    ReduxWrapper(LoginScreen)
  );
  Navigation.registerComponent(NAVIGATION_NAME.AUTH.register, () =>
    ReduxWrapper(RegisterScreen)
  );
  Navigation.registerComponent(NAVIGATION_NAME.MAIN.main, () =>
    ReduxWrapper(MainScreen)
  );
  Navigation.registerComponent(NAVIGATION_NAME.MAIN.setting, () =>
    ReduxWrapper(SettingScreen)
  );
  Navigation.registerComponent(NAVIGATION_NAME.COMPONENTS.modal, () =>
    ReduxWrapper(ModalScreen)
  );
  Navigation.registerComponent(NAVIGATION_NAME.COMPONENTS.alert, () =>
    ReduxWrapper(Alert)
  );
  Navigation.registerComponent(NAVIGATION_NAME.COMPONENTS.toast, () =>
    ReduxWrapper(Toast)
  );
}
