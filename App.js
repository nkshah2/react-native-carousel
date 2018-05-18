/**
 * Author: nkshah2
 * Source: https://github.com/nkshah2/react-native-carousel
 * This is the default sample for this component, check the
 * Examples folder for more.
 * @flow
 */
import React, { Component, } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import Carousel from './src';
import {
  AndroidLogo,
  IOSLogo,
  JavascriptLogo,
  ReactNativeLogo,
} from './assets/images';
import Card from './assets/components/full-width-card';

const data = [
  {
    title: 'Javascript',
    image: JavascriptLogo,
  },
  {
    title: 'React Native',
    image: ReactNativeLogo,
  },
  {
    title: 'Android',
    image: AndroidLogo,
  },
  {
    title: 'iOS',
    image: IOSLogo,
  },
];

const { width } = Dimensions.get( 'window' );

export default class App extends Component<null> {

  renderItem: Function;
  renderItem( { item }: Object ) {
    return (
      <Card data={item} key={item.title} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Carousel
          data={data}
          renderItem={this.renderItem}
          keyExtractor={( item ) => item.title}
          containerStyle={styles.carouselContainerStyle}
          autoScrollEnabled
          userScrollEnabled={ false }
          autoScrollInterval={ 5000 }
          showPagerIndicator
          renderPagerButton={( index, currentIndex ) => {
            const opacity = index === currentIndex ? 1 : 0.5;
            return (
              <View
                style={[{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'red',
                  marginHorizontal: 2,
                }, { opacity }]}
              />
            );
          }}
          getItemLayout={( data, index ) => {
            return { length: width, offset: width * index, index }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  carouselContainerStyle: {
    flex: 1,
    maxHeight: 400,
    alignSelf: 'center',
  }
} );
