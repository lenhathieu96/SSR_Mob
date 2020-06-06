import {Dimensions, StyleSheet} from 'react-native';

import color from '../../../utils/Color';
import * as fontSize from '../../../utils/fontSize';

const windowWidth = Dimensions.get('window').width;
const containerSize = windowWidth > 850 ? 0.3 * windowWidth : 0.4 * windowWidth;

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
    color: '#283593',
    fontSize: 1.5 * fontSize.biggest,
  },

  title: {
    fontSize: fontSize.huge,
    color: '#283593',
  },
  flastlist: {
    alignSelf: 'center',
  },
});

export default styles;
