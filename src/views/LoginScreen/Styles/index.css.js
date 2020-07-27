import {StyleSheet} from 'react-native';

import * as FontSize from '../../../Utils/fontSize';
import color from '../../../Utils/Color';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  LogoWrapper: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    padding: 10,
    flex: 0.4,
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  inputWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: color.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  input: {
    flex: 1,
    fontSize: FontSize.larger,
    color: color.primary,
  },
  errorWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.1,
  },

  txtError: {
    fontSize: FontSize.larger,
    color: color.red,
  },

  btnLogin: {
    backgroundColor: color.primary,
    flex: 0.1,
  },
  txtBtnLogin: {
    color: 'white',
  },
});

export default styles;
