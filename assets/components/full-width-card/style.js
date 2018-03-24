/**
 * Author: nkshah2
 * Source: https://github.com/nkshah2/react-native-carousel
 * @flow
 */
import { StyleSheet, Dimensions, } from 'react-native';

const { width } = Dimensions.get( 'window' );

const style = StyleSheet.create( {
  container: {
    flex: 1,
    width,
  },

  image: {
    flex: 1,
  },

  title: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
    paddingHorizontal: 20,
    color: 'white',
  }
} );

export default style;
