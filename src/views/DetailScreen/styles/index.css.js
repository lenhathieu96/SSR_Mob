import {StyleSheet, Dimensions} from 'react-native';

import * as fontSize from '../../../utils/fontSize';
import color from '../../../utils/Color';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: color.primary,
  },
  //Action Bar=======================================================================================
  actionBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    flex: 0.1,
  },
  actionBarTitle: {
    fontSize: 22,
    flex: 0.9,
    color: 'white',
    textAlign: 'center',
  },
  actionBarBtn: {
    flex: 0.1,
    marginLeft: 10,
  },
  //header=======================================================================================
  headerContainer: {
    height: 0.35 * windowHeight,
  },
  headerDetailContainer: {
    flex: 0.8,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  desc: {
    color: 'white',
    fontSize: fontSize.large,
  },
  moneyContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  money: {
    fontWeight: 'bold',
    color: color.secondary,
    fontSize: fontSize.biggest,
    padding: 5,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressDetailContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  progressTitle: {
    flex: 0.8,
    fontSize: fontSize.larger,
    color: 'white',
  },
  progressDetail: {
    color: color.secondary,
    fontSize: fontSize.large,
    marginRight: 10,
  },

  //=============================================================================================
  bodyContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: -25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },

  emptyListContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyListTitle: {
    color: color.primary,
    fontSize: fontSize.huge,
  },
});
export default styles;
