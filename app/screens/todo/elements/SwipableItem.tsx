import React, {useEffect, useRef} from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from '@rneui/themed';
import Constant from '@/controller/Constant';

const leftButtons = [];
const rightButtons = [
  {
    id: 1,
    title: 'Edit',
    icon: 'edit',
  },
  {
    id: 2,
    title: 'Delete',
    icon: 'delete',
  },
];
const btnWidth = 60;
const offset = [-btnWidth * rightButtons.length, btnWidth * leftButtons.length];

type SwipableItemProps = {
  children: React.ReactNode;
  onDelete: () => void | Promise<void>;
};

const SwipableItem = ({children, onDelete}: SwipableItemProps) => {
  let panValue = {x: 0, y: 0};
  let isOpenState = useRef(false).current;
  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const itemTranslate = pan.x.interpolate({
    inputRange: offset,
    outputRange: offset,
    extrapolate: 'clamp',
  });
  const translateLeftBtns = pan.x.interpolate({
    inputRange: [-leftButtons.length * btnWidth, 0],
    outputRange: [-leftButtons.length * btnWidth, 0],
    extrapolate: 'clamp',
  });
  const translateRightBtns = pan.x.interpolate({
    inputRange: [0, rightButtons.length * btnWidth],
    outputRange: [0, rightButtons.length * btnWidth],
    extrapolate: 'clamp',
  });
  useEffect(() => {
    pan.addListener(value => {
      panValue = value;
    });
  }, []);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponderCapture: (e, g) => Math.abs(g.dx) > 10,
      onMoveShouldSetPanResponder: (e, g) => false,
      onPanResponderGrant: () => {
        pan.setOffset({x: panValue.x, y: panValue.y});
        pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, g) => {
        pan.flattenOffset();
        if (g.vx > 0.5 || g.dx > (btnWidth * leftButtons.length) / 2) {
          if (isOpenState && g.dx > 0) {
            reset();
            return;
          }
          move(false);
          return;
        }
        if (g.vx < -0.5 || g.dx < (-btnWidth * rightButtons.length) / 2) {
          if (isOpenState && g.dx < 0) {
            reset();
            return;
          }
          move(true);
          return;
        }
        reset();
      },
      onPanResponderTerminate: () => {
        reset();
      },
    }),
  ).current;
  const reset = () => {
    isOpenState = false;
    Animated.spring(pan, {
      toValue: {x: 0, y: 0},
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };
  const move = (toLeft: boolean) => {
    isOpenState = true;
    Animated.spring(pan, {
      toValue: {
        x: toLeft
          ? -btnWidth * rightButtons.length
          : btnWidth * leftButtons.length,
        y: 0,
      },
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };
  return (
    <View style={styles.container}>
      {/* <Animated.View
        style={[
          styles.btnContainer,
          {transform: [{translateX: translateLeftBtns}]},
        ]}>
        {leftButtons.map(btn => (
          <TouchableOpacity
            onPress={reset}
            key={btn}
            style={[styles.btn, {backgroundColor: 'red'}]}>
            <Text>{btn}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View> */}
      <Animated.View
        style={[
          styles.btnContainer,
          {
            transform: [{translateX: translateRightBtns}],
            alignSelf: 'flex-end',
          },
        ]}>
        {rightButtons.map(btn => (
          <TouchableOpacity
            onPress={() => {
              reset();
              onDelete();
            }}
            key={btn.id}
            style={[styles.btn, {backgroundColor: '#fff'}]}>
            <Icon name={btn.icon} color={btn.id == 1 ? 'green' : 'red'} />
            <Text style={styles.btnTitle}>{btn.title}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
      <Animated.View
        style={[styles.item, {transform: [{translateX: itemTranslate}]}]}
        {...panResponder.panHandlers}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    marginBottom: 3,
  },
  item: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  txt: {
    color: '#fff',
    letterSpacing: 1,
  },
  btnContainer: {
    height: '100%',
    position: 'absolute',
    flexDirection: 'row',
  },
  btn: {
    height: '100%',
    width: btnWidth,
    backgroundColor: 'red',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitle: {
    fontSize: 16,
    color: 'black',
    fontFamily: Constant.fonts.SuperDream,
  },
});

export default SwipableItem;
