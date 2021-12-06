import React, {Component, createContext} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

export const ConnectionContext = createContext(false);

class RootContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <View style={{flex: 1}} />;
  }
}

const mapStateToProps = (state, props) => {
  return {};
};

export default connect(mapStateToProps, null)(RootContainer);
