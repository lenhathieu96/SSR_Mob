import {StyleSheet, Dimensions} from 'react-native';

import * as fontSize from '../../../../Utils/fontSize';
import color from '../../../../Utils/Color';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  BSEmptyTables__Header: {
    padding: 10,
    backgroundColor: color.bg,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
  },
  BSEmptyTables__Body: {
    backgroundColor: color.bg,
    padding: 10,
  },
  BSEmptyTables__Title: {
    fontSize: fontSize.huge,
    color: color.primary,
  },
  BSEmptyTables__itemContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: color.unactive,
  },
  BSEmptyTables__itemTitle: {
    fontSize: fontSize.larger,
  },
});

export default styles;
