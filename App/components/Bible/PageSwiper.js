import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styled from '@emotion/native';

import Chapter from 'components/Bible/Chapter';
import { useIsMounted } from 'lib/hooks';

const width = Dimensions.get('window').width;

export default function PageSwiper({ prev, curr, next, onPrev, onNext }) {
  const isMounted = useIsMounted();
  const pagesRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(calculateIndex(isMounted));
  const [data, setData] = useState(calculateData(isMounted));

  useEffect(() => {
    if (!pagesRef?.current) return;
    pagesRef.current?.scrollToIndex({ index: currentIndex, animated: false });
  }, [pagesRef]);
  
  useEffect(() => {
    if (!isMounted) return;
    const index = calculateIndex();
    setCurrentIndex(index);
    setData(calculateData());
    pagesRef.current.scrollToIndex({ index, animated: false });
  }, [curr?.[0]]);

  function calculateIndex(skip = false) {
    if (skip) return 0;
    if (prev?.[0]) return 1;
    return 0;
  }

  function calculateData(skip = false) {
    if (skip) return [];
    const array = [];
    if (prev?.[0]) {
      array.push(prev);
    }
    array.push(curr);
    if (next?.[0]) {
      array.push(next);
    }
    return array;
  }
  
  useEffect(() => {
    if (!isMounted) return;
    pagesRef.current.scrollToIndex({ index: currentIndex, animated: false });
  }, [data]);

  function onScroll(event) {
    const position = event.nativeEvent.contentOffset.x;
    const index = parseInt((position) / width);
    if (index === currentIndex) return;

    if (index > currentIndex) {
      onNext();
      setCurrentIndex(index);
    }
    else if (index < currentIndex) {
      onPrev();
      const index = 0 === currentIndex ? 0 : currentIndex - 1;
      setCurrentIndex(index);
    }
    else return;
  }


  function renderItem({ item }) {
    return (
      <Container>
        <Spacer />
        <Chapter verses={item} />
      </Container>
    );
  }
  
  return (
    <SafeArea>
      <FlatList
        nestedScrollEnabled
        ref={pagesRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => `${item?.[0]} ${item?.[1]}`}
        onMomentumScrollEnd={onScroll}
        extraData={currentIndex}
        getItemLayout={(data, index) => (
          {length: width, offset: width * index, index}
        )}
        scrollEventThrottle={50}
      />
    </SafeArea>
  );
}

PageSwiper.defaultProps = {
  prev: [],
  curr: [],
  next: [],
  onPrev: () => {},
  onNext: () => {},
};

PageSwiper.propTypes = {
  prev: PropTypes.array,
  curr: PropTypes.array,
  next: PropTypes.array,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
};

const SafeArea = styled.SafeAreaView(({ theme }) => ({
  backgroundColor: theme.background.reading,
}));

const Container = styled.ScrollView(() => ({
  paddingHorizontal: 32,
  width,
}));

const Spacer = styled.View({ height: 30 });
