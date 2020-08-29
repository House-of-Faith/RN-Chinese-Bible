import React, { useEffect, useRef } from "react";
import styled from "@emotion/native";
import GestureRecognizer from "react-native-swipe-gestures";

const Main = ({ verses, swipeLeft, swipeRight }) => {
    const ref = useRef(null);

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 100,
    };

    useEffect(() => {
        if (ref?.current) ref.current.scrollTo({ y: 0 });
    }, [verses]);

    return (
        <SafeArea>
            <Container ref={ref}>
                <GestureRecognizer
                    onSwipeLeft={swipeLeft}
                    onSwipeRight={swipeRight}
                    config={config}
                >
                    <Spacer />
                    {verses?.map((verse, i) => {
                        return (
                            <Verse key={i}>
                                {i + 1} {verse}
                            </Verse>
                        );
                    })}
                </GestureRecognizer>
            </Container>
        </SafeArea>
    );
};

export default Main;

const SafeArea = styled.SafeAreaView(({ theme }) => ({
    backgroundColor: theme.background.reading,
}));

const Container = styled.ScrollView(({ theme }) => ({
    paddingHorizontal: 32,
}));

const Verse = styled.Text(({ theme }) => ({
    fontSize: 19,
    lineHeight: 27,
    marginBottom: 13,
    color: theme.text.reading,
}));

const Spacer = styled.View({ height: 30 });
