import {Navigation as RNNavigation} from 'react-native-navigation';
import StartupActions from '../Redux/StartupRedux';
import StoreHelper from '../Services/StoreHelper';
import NavigationServices from './NavigationServices';
import RegisterComponent, {NAVIGATION_NAME} from './RegisterComponent';
import DefaultOptions from './Styles/';
import TempStorage from '../Modules/TempStorage';

RegisterComponent();

RNNavigation.events().registerComponentDidAppearListener((nav) => {
  console.tron.send('state.action.complete', {
    name: `NAVIGATE/${nav.componentName}`,
    action: nav
  });
  NavigationServices.setActiveNavigation(nav);
});

RNNavigation.setDefaultOptions({
  statusBar: DefaultOptions.statusBar,
  topBar: DefaultOptions.topBar,
  bottomTabs: DefaultOptions.bottomTabs,
  bottomTab: DefaultOptions.bottomTab,
  layout: DefaultOptions.layout,
  animations: DefaultOptions.animations
});

let hasLaunched = false;
RNNavigation.events().registerAppLaunchedListener(async () => {
  if (!hasLaunched) {
    await TempStorage.init();

    if (TempStorage.getRestoreData().getIn(['session', 'isLoggedIn'])) {
      console.tron.error({
        c: TempStorage.getRestoreData().getIn(['session', 'isLoggedIn'])
      });
    }

    hasLaunched = true;
    RNNavigation.setRoot({
      root: {
        stack: {
          id: 'root',
          children: [
            {
              component: {
                name: NAVIGATION_NAME.APP
              }
            }
          ]
        }
      }
    });
  } else {
    StoreHelper.dispatch(StartupActions.startup());
  }
});
