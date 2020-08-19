import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, Dimensions, Keyboard} from 'react-native';

import BottomSheet from 'reanimated-bottom-sheet';

import IconButton from '../../IconButton';

import Content from './Content';
import * as fontSize from '../../../Utils/fontSize';

import styles from './styles/index.css';

const BSOrderConfig = React.forwardRef((props, ref) => {
  const {food, onIncreaseFood, onDecreaseFood, onAddNewFood, isUpdate} = props;
  const height = 0.9 * Dimensions.get('window').height;

  return (
    <BottomSheet
      ref={ref}
      snapPoints={[height, 0]}
      renderHeader={() => (
        <View style={styles.BSOrderConfig__Header}>
          <IconButton
            style={{marginTop: 10}}
            iconSize={fontSize.huge}
            iconName="grip-lines"
            onPress={() => ref.current.snapTo(1)}
          />
        </View>
      )}
      renderContent={() => (
        <Content
          food={food}
          onIncreaseFood={onIncreaseFood}
          onDecreaseFood={onDecreaseFood}
          onAddNewFood={onAddNewFood}
          isUpdate={isUpdate}
        />
      )}
      initialSnap={1}
    />
  );
});

BSOrderConfig.propTypes = {
  food: PropTypes.object.isRequired,
  onIncreaseFood: PropTypes.func.isRequired,
  onDecreaseFood: PropTypes.func.isRequired,
  onAddNewFood: PropTypes.func.isRequired,
};

export default BSOrderConfig;
