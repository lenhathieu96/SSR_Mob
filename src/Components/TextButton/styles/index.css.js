import {StyleSheet} from 'react-native';
import * as fontSize from '../../../utils/fontSize';
import color from '../../../utils/Color';

const styles = StyleSheet.create({
  TextButton: {
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: fontSize.larger,
    color: 'white',
  },
});
export default styles;
