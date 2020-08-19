import {StyleSheet, Dimensions} from 'react-native';

import * as fontSize from '../../../../Utils/fontSize';
import color from '../../../../Utils/Color';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  BSOrderConfig__Header: {
    backgroundColor: color.bg,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
  },
  BSOrderConfig__Body: {
    flexGrow: 1,
    padding: 10,
    height: windowHeight,
    backgroundColor: color.bg,
  },

  Body__Detail: {
    flexDirection: 'row',
    padding: 10,
  },
  Detail__Title: {
    fontSize: fontSize.larger,
    flex: 0.5,
    textAlign: 'center',
  },
  Detail__priceNumber: {
    fontSize: fontSize.larger,
    fontWeight: 'bold',
    color: color.secondary,
    textAlign: 'center',
    flex: 0.5,
  },

  Body__QuantityConfigWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.1,
  },
  QuantityConfigWrapper__QuantityNumber: {
    fontSize: fontSize.biggest,
    fontWeight: 'bold',
    color: color.secondary,
    textAlign: 'center',
    flex: 0.2,
  },
  btnQuantity: {
    alignItems: 'center',
  },

  noteInput: {
    padding: 10,
    flex: 0.1,
    fontSize: fontSize.larger,
    fontFamily: 'MavenPro-Regular',
    borderColor: color.unactive,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderRadius: 20,
  },

  ButtonWrapper: {
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  btnConfirm: {
    backgroundColor: color.primary,
    marginBottom: 10,
    marginTop: 10,
  },
  btnAdd: {
    backgroundColor: color.add,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default styles;
