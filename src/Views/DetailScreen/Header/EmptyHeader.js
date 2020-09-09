import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {BoldText} from '../../../Components/Text';

import * as fontSize from '../../../Utils/fontSize';
import styles from '../styles/index.css';

function EmptyHeader(props) {
  return (
    <View style={styles.headerEmptyContainer}>
      <Icon
        name="mug-hot"
        color="white"
        size={2 * fontSize.biggest}
        style={{alignSelf: 'center'}}
      />
      <BoldText
        style={[
          {fontSize: fontSize.huge, color: 'white', alignSelf: 'center'},
        ]}>
        Bàn Trống !
      </BoldText>
    </View>
  );
}

export default EmptyHeader;
