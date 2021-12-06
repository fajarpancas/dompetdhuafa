import React, {PureComponent} from 'react';
import {Button, Text, View} from 'react-native';
import {connect} from 'react-redux';
import NavigationServices from '../../Navigation/NavigationServices';
import {NAVIGATION_NAME} from '../../Navigation/RegisterComponent';
import SampleActions from '../../Redux/SampleRedux';
import ApplicationStyles from '../../Themes/ApplicationStyles';

class LoginScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.navigateToMain = this.navigateToMain.bind(this);
    this.navigateToRegister = this.navigateToRegister.bind(this);
  }

  navigateToMain() {
    const {sampleRequst} = this.props;
    sampleRequst();
  }

  navigateToRegister() {
    NavigationServices.push(
      NAVIGATION_NAME.AUTH.register,
      {
        // passing parameter
        fromLogin: true
      },
      {
        // passing option
        topBar: {
          title: {
            text: 'Register'
          }
        }
      }
    );
  }

  render() {
    return (
      <View style={ApplicationStyles.containerCenter}>
        <Text> Login Screen </Text>
        <Button
          title="Navigate To Main with Redux Action"
          onPress={this.navigateToMain}
        />
        <Button
          title="Navigate To Register Screen"
          onPress={this.navigateToRegister}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    sampleRequst: () => dispatch(SampleActions.actionRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
