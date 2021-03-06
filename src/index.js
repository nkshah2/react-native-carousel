/**
 * Author: nkshah2
 * Source: https://github.com/nkshah2/react-native-carousel
 * @flow
 */
import React, { PureComponent, } from 'react';
import {
  View,
  FlatList,
} from 'react-native';

type PropType = {
  data: Array<Object>;
  renderItem: Function;
  keyExtractor: Function;
  getItemLayout: Function,
  userScrollEnabled?: boolean,
  showPagerIndicator?: boolean,
  renderPagerButton?: Function | null,
  containerStyle?: Object,
  autoScrollEnabled?: boolean,
  showsHorizontalScrollIndicator?: boolean,
  autoScrollInterval?: number,
  initialScrollIndex?: number,
};

type StateType = {
  currentIndex: number,
};

const AUTO_SCROLL_DEFAULT_INTERVAL = 3000;

class Carousel extends PureComponent< PropType, StateType > {
  static defaultProps = {
    autoScrollEnabled: false,
    showPagerIndicator: false,
    renderPagerButton: null,
    containerStyle: {},
    userScrollEnabled: true,
    showsHorizontalScrollIndicator: true,
    initialScrollIndex: 0,
  }

  constructor( props: PropType ) {
    super( props );

    this.state = {
      currentIndex: props.initialScrollIndex || 0,
    };

    this.renderPagerItem = this.renderPagerItem.bind( this );
    this.handleAutoScroll = this.handleAutoScroll.bind( this );
    this.scrollToIndex = this.scrollToIndex.bind( this );

    this.shouldAutoScroll = true;
  }
  state: StateType;

  componentDidMount() {
    const {
      autoScrollEnabled,
      autoScrollInterval,
    } = this.props;

    if ( autoScrollEnabled ) {
      setInterval( this.handleAutoScroll, autoScrollInterval || AUTO_SCROLL_DEFAULT_INTERVAL );
    }
  }

  props: PropType;
  listRef: Object | null;
  pagerRef: Object | null;
  shouldAutoScroll: boolean;

  scrollToIndex : Function;
  scrollToIndex( index: number ) {
    if ( this.listRef ) {
      this.listRef.scrollToIndex( { animated: true, index, viewPosition: 0.5 } );
    }
  }

  handleAutoScroll: Function;
  handleAutoScroll() {
    const { data } = this.props;
    if ( this.shouldAutoScroll ) {
      if ( this.state.currentIndex === data.length - 1 ) {
      // scroll to first index
      this.setState( { currentIndex: 0 } );
    } else {
      // scroll to next index
      this.setState( { currentIndex: this.state.currentIndex + 1 } );
    }

    this.scrollToIndex( this.state.currentIndex );
    }
  }

  renderPagerItem: Function;
  renderPagerItem( { index }: Object ) {
    if ( this.props.renderPagerButton ) {
      return this.props.renderPagerButton( index, this.state.currentIndex );
    }
    const opacity = index === this.state.currentIndex ? 1 : 0.5;
    return (
      <View
        style={ [{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: 'black',
          marginHorizontal: 2,
        }, { opacity }] }
      />
    );
  }

  render() {
    const {
      data,
      renderItem,
      keyExtractor,
      containerStyle,
      userScrollEnabled,
      showsHorizontalScrollIndicator,
      showPagerIndicator,
      getItemLayout,
    } = this.props;
    return (
      <View
        style={ [containerStyle, { flexDirection: 'column', alignItems: 'center' }] }
      >
          <FlatList
            data={ data }
            extraData={ data }
            renderItem={ renderItem }
            keyExtractor={ keyExtractor }
            horizontal
            scrollEventThrottle={ 1 }
            onScroll={ ( event ) => {
              const layoutWidth = Math.round( event.nativeEvent.layoutMeasurement.width );
              const offsetX = Math.round( event.nativeEvent.contentOffset.x );
              const index = Math.round( offsetX / layoutWidth );

              if ( index !== this.state.currentIndex ) {
                this.setState( { currentIndex: index } );
              }
            } }
            onTouchStart={ () => {
              if ( userScrollEnabled ) {
                this.shouldAutoScroll = false;
              }
            } }
            onTouchEnd={ () => {
              if ( userScrollEnabled ) {
                this.shouldAutoScroll = true;
              }
            } }
            scrollEnabled={ userScrollEnabled }
            pagingEnabled
            showsHorizontalScrollIndicator={ showsHorizontalScrollIndicator }
            overScrollMode={ 'never' }
            getItemLayout={ getItemLayout }
            ref={ ( ref ) => { this.listRef = ref; } }
            style={ { marginBottom: 10 } }
          />
          {
            showPagerIndicator &&
            <FlatList
              data={ data }
              extraData={ this.state.currentIndex }
              horizontal
              keyExtractor={ keyExtractor }
              renderItem={ this.renderPagerItem }
              ref={ ( ref ) => { this.pagerRef = ref; } }
            />
          }
      </View>
    );
  }

}

export default Carousel;
