import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';

import * as fontSize from '../../utils/fontSize';
import color from '../../utils/Color';

import styles from './styles/index.css';

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};

function IconButton(props) {
  const {onPress, iconName, style, disabled} = props;
  return (
    <TouchableOpacity
      style={[styles.iconButton, {style}]}
      onPress={onPress}
      disabled={disabled}>
      <Icon name={iconName} color={color.primary} size={fontSize.biggest} />
    </TouchableOpacity>
  );
}

export default IconButton;
