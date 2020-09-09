import {Dimensions, StyleSheet} from 'react-native';

import color from '../../../Utils/Color';
import * as fontSize from '../../../Utils/fontSize';

const windowWidth = Dimensions.get('window').width;
const containerSize = windowWidth > 641 ? 0.3 * windowWidth : 0.4 * windowWidth;

const styles = StyleSheet.create({
  itemTableContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 20,
    borderColor: color.unactive,
    borderWidth: 1,
    height: containerSize,
    width: containerSize,
  },
  itemTableContainer__used: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 20,
    borderColor: color.unactive,
    borderWidth: 1,
    height: containerSize,
    width: containerSize,
    backgroundColor: color.secondary,
  },
  icon: {
    color: color.primary,
    fontSize: 1.5 * fontSize.biggest,
  },

  title: {
    fontSize: fontSize.huge,
    color: color.primary,
  },
  TableListContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },

  flastlist: {
    alignSelf: 'center',
  },

  btncreateBill: {
    backgroundColor: color.primary,
    marginBottom: 10,
  },
});

export default styles;
