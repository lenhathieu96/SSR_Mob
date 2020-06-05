import {StyleSheet} from 'react-native';

import * as fontSize from '../../../utils/fontSize';
import color from '../../../utils/Color';

const styles = StyleSheet.create({
  //menu style
  menuContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  //search bar
  input: {
    padding: 10,
    fontSize: 18,
    fontFamily: 'MavenPro-Regular',
    borderColor: color.unactive,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    fontSize: fontSize.large,
    flex: 1,
  },
  itemPrice: {
    fontSize: fontSize.large,
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
  },
});
export default styles;
