import React, { Component } from "react";
import DropdownAlert from "react-native-dropdownalert";
// import {colors} from '../../utils/constants';

export default class DropdownMessageAlert extends Component<{}> {
  render() {
    return (
      <DropdownAlert
        defaultTextContainer={{
          padding: 10,
          paddingTop: 30,
          marginHorizontal: 5
        }}
        ref={ref => (this.dropdown = ref)}
        updateStatusBar={false}
        closeInterval={3000}
        // successColor={colors.CYAN}
      />
    );
  }

  itemAction(item) {
    this.dropdown.alertWithType(item.type, item.title, item.message);
  }
}
