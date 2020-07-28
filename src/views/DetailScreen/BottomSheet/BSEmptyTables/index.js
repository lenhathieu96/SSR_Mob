import React, {useRef, useContext} from 'react';
import {SafeAreaView, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import BottomSheet from 'reanimated-bottom-sheet';

import {TablesContext} from '../../../../Contexts/TablesContext';

import {BoldText} from '../../../../Components/Text';
import IconButton from '../../../../Components/IconButton';

import Body from './Body';

import * as fontSize from '../../../utils/fontSize';
import styles from '../../styles/index.css';

BSEmptyTables.propTypes = {};

function BSEmptyTables(props) {
  const {chooseSwitchTable} = props;
  const bottomSheetRef = useRef();
  const height = 0.3 * Dimensions.get('window').height;

  const tablesContext = useContext(TablesContext);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[height, 0]}
      initialSnap={1}
      enabledContentGestureInteraction={false}
      renderHeader={() => (
        <SafeAreaView style={styles.BSDetail__Header}>
          <IconButton
            iconSize={fontSize.huge}
            iconName="grip-lines"
            onPress={() => bottomSheetRef.current.snapTo(1)}
          />
          <BoldText
            text="Danh Sách Bàn Còn Trống"
            style={styles.BSDetail__Title}
          />
        </SafeAreaView>
      )}
      renderContent={() => (
        <Body
          tables={tablesContext.tables}
          chooseSwitchTable={chooseSwitchTable}
        />
      )}
    />
  );
}

export default BSEmptyTables;
