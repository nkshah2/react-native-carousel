/**
 * Author: nkshah2
 * Source: https://github.com/nkshah2/react-native-carousel
 * @flow
 */

import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import styles from './style';

type PropType = {
  data: Object,
}

const MyComponent = ( props: PropType ) => (
  <View style={styles.container}>
    <Image
      source={props.data.image}
      style={styles.image}
    />
    <Text
      style={styles.title}
    >
        {props.data.title}
    </Text>
  </View>
);

export default MyComponent;
