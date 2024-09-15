import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Animated, {
  Easing,
  FadeOut,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Constant from '@/controller/Constant';

type ChildWrapperProps = {
  isEnabled: boolean;
  ignoreDelay: boolean;
  hideClose?: boolean;
  onClosePress: () => void;
  onEnterAnimationFinished: () => void;
  children: React.ReactNode;
};

function ChildWrapper({
  isEnabled,
  ignoreDelay,
  hideClose,
  onClosePress,
  onEnterAnimationFinished,
  children,
}: ChildWrapperProps) {
  const opacityValue = useSharedValue(0);
  const viewStyle = useAnimatedStyle(() => {
    return {opacity: opacityValue.value};
  }, [isEnabled]);

  useEffect(() => {
    if (isEnabled) {
      opacityValue.value = withDelay(
        ignoreDelay
          ? 0
          : Constant.duration.CHILD_ANIM_DURATION +
              Constant.duration.LAYOUT_ANIM_DURATION,
        withTiming(
          1,
          {
            duration: Constant.duration.CHILD_ANIM_DURATION,
            easing: Easing.ease,
          },
          finished => {
            if (finished) {
              runOnJS(onEnterAnimationFinished)();
            }
          },
        ),
      );
    } else {
      opacityValue.value = withTiming(0, {
        duration: Constant.duration.CHILD_ANIM_DURATION,
        easing: Easing.ease,
      });
    }
  }, [isEnabled, ignoreDelay]);

  return (
    <Animated.View
      style={[
        viewStyle,
        {
          position: isEnabled ? 'relative' : 'absolute',
          margin: 32,
        },
      ]}
      exiting={
        ignoreDelay
          ? undefined
          : FadeOut.duration(Constant.duration.MODAL_ANIM_DURATION)
      }
      needsOffscreenAlphaCompositing>
      {children}
      {!hideClose && (
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={onClosePress}>
          <Text style={styles.textStyle}>Close Modal</Text>
        </Pressable>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    marginTop: 16,
  },
  buttonClose: {
    backgroundColor: '#e34055',
    marginHorizontal: 30,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: Constant.fonts.SuperDream,
  },
});

export default ChildWrapper;
