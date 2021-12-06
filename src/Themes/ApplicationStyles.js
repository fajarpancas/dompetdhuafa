import {StyleSheet} from 'react-native';
import Colors from './Colors';

const ApplicationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  containerCenter: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default ApplicationStyles;
