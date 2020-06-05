import React from 'react';
import {TouchableOpacity} from 'react-native';
import {BoldText} from '../Text';
import styles from './styles/index.css';

import PropTypes from 'prop-types';

TextButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};

function TextButton(props) {
  const {style, onPress, text, disabled} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[style, styles.TextButton]}>
      <BoldText text={text} style={styles.text} />
    </TouchableOpacity>
  );
}

export default TextButton;
