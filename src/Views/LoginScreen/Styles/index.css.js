import {StyleSheet} from 'react-native';

import * as FontSize from '../../../Utils/fontSize';
import color from '../../../Utils/Color';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  LogoWrapper: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Title: {
    fontSize: FontSize.biggest,
    color: color.primary,
    textAlign: 'center',
  },
  formContainer: {
    padding: 10,
    justifyContent: 'space-evenly',
    flexGrow: 0.6,
  },
  inputWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: color.primary,
    alignItems: 'center',
    flex: 0.2,
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
    marginBottom: 24,
    flex: 0.1,
  },
  txtBtnLogin: {
    color: 'white',
  },
});

export default styles;
