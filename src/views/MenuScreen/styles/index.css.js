import {StyleSheet, Dimensions} from 'react-native';

import * as fontSize from '../../../Utils/fontSize';
import color from '../../../Utils/Color';

const height = 0.7 * Dimensions.get('window').height;

const styles = StyleSheet.create({
  //menu style
  menuContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  //search bar
  searchInput: {
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
});
export default styles;
