import React, {PureComponent} from 'react';
import {Text, View, Button} from 'react-native';
import {connect} from 'react-redux';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import NavigationServices from '../../Navigation/NavigationServices';
import {NAVIGATION_NAME} from '../../Navigation/RegisterComponent';
import {createSelector} from 'reselect';
import {SessionSelectors} from '../../Redux/SessionRedux';

class SettingScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.showModal = this.showModal.bind(this);
  }

  showModal() {
    NavigationServices.showModal(NAVIGATION_NAME.COMPONENTS.modal, {
      modalPresentationStyle: 'overCurrentContext',
      layout: {
        backgroundColor: 'transparent'
      }
    });
  }

  showOverlay(type) {
    NavigationServices.showOverlay(type, {
      layout: {
        componentBackgroundColor: 'transparent'
      }
    });
  }

  render() {
    const {loggedAt} = this.props;

    return (
      <View style={ApplicationStyles.containerCenter}>
        <Text>You logged in at: {loggedAt}</Text>
        <Button title="Show Modal" onPress={this.showModal} />
        <Button
          title="Show Toast"
          onPress={() => this.showOverlay(NAVIGATION_NAME.COMPONENTS.toast)}
        />
        <Button
          title="Show Alert"
          onPress={() => this.showOverlay(NAVIGATION_NAME.COMPONENTS.alert)}
        />
      </View>
    );
  }
}

const selector = createSelector([SessionSelectors.getLoggedAt], (loggedAt) => {
  return {
    loggedAt
  };
});

const mapStateToProps = (state) => {
  return selector(state);
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
