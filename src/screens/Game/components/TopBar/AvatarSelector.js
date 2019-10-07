import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import bear from '../Icons/Avatar/Bear.png';
import bull from '../Icons/Avatar/Bull.png';
import cat from '../Icons/Avatar/Cat.png';
import dog from '../Icons/Avatar/Dog.png';
import unicorn from '../Icons/Avatar/Unicorn.png';
import whale from '../Icons/Avatar/Whale.png';

const images = {
  bear,
  bull,
  cat,
  dog,
  unicorn,
  whale,
};


const OPTIONS = [
  'bear',
  'bull',
  'cat',
  'dog',
  'unicorn',
  'whale',
];

class AvatarSelector extends Component {
  render() {
    const { onChangeAvatar } = this.props;
    return (
      <ModalDropdown
        style={styles.button}
        textStyle={styles.text}
        dropdownStyle={styles.dropdown}
        options={OPTIONS}
        onSelect={onChangeAvatar}
        renderRow={this.renderRow.bind(this)}
      />
    );
  }

  renderRow(rowData) {
    return (
      <TouchableOpacity>
        <View style={[styles.row]}>
          <Image
            style={styles.image}
            mode='stretch'
            source={images[rowData]}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    backgroundColor: 'transparent',
  },
  text: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 18,
    color: 'transparent',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdown: {
    height: 335,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginLeft: 4,
    width: 55,
    height: 55,
  },
});

AvatarSelector.propTypes = {
  onChangeAvatar: PropTypes.func.isRequired,
};

export default AvatarSelector;
