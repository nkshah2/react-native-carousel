# react-native-custom-carousel

[![npm version](https://badge.fury.io/js/react-native-custom-carousel.svg)](https://badge.fury.io/js/react-native-custom-carousel)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

A simple way to use and display carousels in your React Native application. This comes with support for autoscrolling, stepped-scrolling and
rendering a pager indicator below the carousel.

## Installation

Run the following command.

`npm install react-native-custom-carousel`


## Sample
<img src="https://github.com/nkshah2/react-native-custom-carousel/blob/master/assets/images/readme/auto-run-with-pager.gif" alt="Sample GIF" width="300px" height="400px"/>

## About

This package is a simple way to create a custom carousel that also allows auto scrolling along with traditional scrolling. You can use the 
`renderItem` prop to pass a function that renders individual items, you can also pass a function to render the pager icon at the bottom of the carousel using the `renderPagerButton` prop.

#### For Example

```javascript
<Carousel
          data={ data }
          renderItem={ this.renderItem }
          keyExtractor={ ( item ) => item.title }
          containerStyle={ styles.carouselContainerStyle }
          autoScrollEnabled
          userScrollEnabled={ false }
          autoScrollInterval={ 5000 }
          showPagerIndicator
          renderPagerButton={ ( index, currentIndex ) => {
            const opacity = index === currentIndex ? 1 : 0.5;
            return (
              <View
                style={ [{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'red',
                  marginHorizontal: 2,
                }, { opacity }] }
              />
            );
          } }
          getItemLayout={ ( dataset, index ) => {
            return { length: width, offset: width * index, index };
          } }
        />
```

This renders the sample displayed above ( The full example can be found in App.js ).

## Props

#### Mandatory

* data - An array of Objects to be used to render individual cards in the carousel.
* renderItem - A Function that accepts an Object as a parameter. This Object contains the item and index of the current card ( Similar                  to how render item works in a FlatList ).
* keyExtractor - A Function to extract the keys from the data items.
* getItemLayout - Exactly the same as getItemLayout for FlatList.

#### Optional
* userScrollEnabled - Boolean used to switch off/on the user's ability to manually scroll the carousel. ( DEFAULT: true ).
* showPagerIndicator - Boolean used to decide whether or not the pager below the carousel is to be shown. ( DEFAULT: false ).
* renderPagerButton - Function used to display individual pager icons. The function recieves two parameters - its own index and the                           index of the current card. If no function is passed for this prop the pager is by default the red circles shown in                       the demo.
* containerStyle - An Object that is appended to the style of the carousel container, which can be used to adjust the styling of the                        overall container only not the individual cards. ( DEFAULT: {} ).
* autoScrollEnabled - Boolean used to decide whether to auto scroll the carousel or not. ( DEFAULT: false ).
* showsHorizontalScrollIndicator - Boolean passed to the scroll container as the `showsHorizontalScrollIndicator` prop. ( DEFAULT: true ).
* autoScrollInterval - Number ( in milliseconds ) to be used as the delay between each auto scroll. ( DEFAULT: 3000 ).
* initialScrollIndex - Number to be used as the starting index for auto scroll. ( DEFAULT: 0 ).

#### NOTE: By default paging is enabled on the carousel for a smooth experience, there is no way to turn it off for now.

## Known Bugs
* The view pager icon selection jumps between current and previous values during rendering.
