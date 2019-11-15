import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
// import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';

export default class LoadingButton extends Component<{}> {
  static propTypes = {
    title: PropTypes.string,
    style: PropTypes.object,
    titleStyle: PropTypes.object,
    loadingColor: PropTypes.string,
  };

  state = {
      isLoading: false,
  };

  showLoading(isLoading) {
    if (isLoading) {
      this.setState({ isLoading: isLoading });
    } else {
      this.setState({ isLoading: isLoading });
    }
  }

  render() {
    return(
      <TouchableOpacity activeOpacity={0.7} onPress={!this.state.isLoading ? this.props.onPress : null} style={[styles.button, this.props.style]} >
        {
          this.state.isLoading
          ? <ActivityIndicator size="small" color={this.props.loadingColor || 'white'} />
          : <Text style={[styles.title, this.props.titleStyle]} >{this.props.title}</Text>
        }
      </TouchableOpacity>
    );
  }
}

const styles = {
  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#67c2fa',
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: '200',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
    textAlign: 'center',
  }
};
