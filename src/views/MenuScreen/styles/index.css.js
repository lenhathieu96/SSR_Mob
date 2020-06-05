import {StyleSheet, Dimensions} from 'react-native';

import * as fontSize from '../../../utils/fontSize';
import color from '../../../utils/Color';

const height = 0.7 * Dimensions.get('window').height;

const styles = StyleSheet.create({
  //menu style
  menuContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  //search bar
  input: {
    padding: 10,
    fontSize: fontSize.larger,
    fontFamily: 'MavenPro-Regular',
    borderColor: color.unactive,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  menuBody: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: fontSize.large,
    marginTop: 10,
  },
  //=============================================================================================
  //menu item styles
  menuItemContainer: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: color.unactive,
  },
  itemName: {
    fontSize: fontSize.larger,
    flex: 1,
  },
  itemPrice: {
    fontSize: fontSize.larger,
  },
  //=============================================================================================
  //bottom sheet styles
  bottomSheetHeader: {
    padding: 10,
    backgroundColor: color.bg,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
  },
  bottomSheetBody: {
    backgroundColor: color.bg,
    flexGrow: 1,
    padding: 10,
    height,
  },
  bottomSheetTitle: {
    fontSize: fontSize.larger,
    flex: 0.7,
  },
  bottomSheetNumber: {
    fontSize: fontSize.larger,
    fontWeight: 'bold',
    color: color.secondary,
  },
  btnAdd: {
    backgroundColor: color.add,
    marginBottom: 10,
  },
});
export default styles;
