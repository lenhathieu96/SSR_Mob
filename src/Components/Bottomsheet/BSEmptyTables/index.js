import React, {useContext} from 'react';
import {SafeAreaView, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import BottomSheet from 'reanimated-bottom-sheet';

import {TablesContext} from '../../../Contexts/TablesContext';

import {BoldText} from '../../Text';
import IconButton from '../../IconButton';

import Content from './Content';

import * as fontSize from '../../../Utils/fontSize';
import styles from './styles/index.css';

const BSEmptyTables = React.forwardRef((props, ref) => {
  const {chooseSwitchTable} = props;
  const height = 0.65 * Dimensions.get('window').height;

  const tablesContext = useContext(TablesContext);

  return (
    <BottomSheet
      ref={ref}
      snapPoints={[height, 0]}
      initialSnap={1}
      enabledInnerScrolling={true}
      enabledContentGestureInteraction={false}
      renderHeader={() => (
        <SafeAreaView style={styles.BSEmptyTables__Header}>
          <IconButton
            iconSize={fontSize.huge}
            iconName="grip-lines"
            onPress={() => ref.current.snapTo(1)}
          />
          <BoldText
            text="Danh Sách Bàn Còn Trống"
            style={[styles.BSEmptyTables__Title]}
          />
        </SafeAreaView>
      )}
      renderContent={() => (
        <Content
          tables={tablesContext.tables}
          chooseSwitchTable={chooseSwitchTable}
        />
      )}
    />
  );
});

BSEmptyTables.propTypes = {
  chooseSwitchTable: PropTypes.func,
};

export default BSEmptyTables;
