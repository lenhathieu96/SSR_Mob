import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import * as Progress from 'react-native-progress';

import * as fontSize from '../../Utils/fontSize';

import Text from '../Text';

import color from '../../Utils/Color';
import styles from './styles/index.css';

function Loader() {
  return (
    <View>
      <Modal isVisible={true}>
        <View style={styles.ModalContainer}>
          <Progress.CircleSnail
            indeterminate={true}
            size={2 * fontSize.biggest}
            color={color.secondary}
            thickness={5}
            allowFontScaling={true}
          />
          <Text style={styles.ModalText}>Vui Lòng Chờ!</Text>
        </View>
      </Modal>
    </View>
  );
}

export default Loader;
