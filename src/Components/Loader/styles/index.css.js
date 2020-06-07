import {StyleSheet} from 'react-native';
import color from '../../../utils/Color';
import * as fontSize from '../../../utils/fontSize';

const styles = StyleSheet.create({
  ModalContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    height: 5 * fontSize.biggest,
    width: 5 * fontSize.biggest,
    backgroundColor: 'white',
  },
  ModalText: {
    fontSize: fontSize.large,
  }
});

export default styles;
