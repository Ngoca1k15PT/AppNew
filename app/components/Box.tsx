import {Layout} from '@/theme';
import React, {forwardRef, memo} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

interface BoxProps extends ViewStyle {
  children?: React.ReactNode;
  fill?: boolean;
  flex?: number;
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  backgroundColor?: string;
  opacity?: number;
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  reverse?: boolean;
  row?: boolean;
  center?: boolean;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  height?: number | 'auto' | `${number}%`;
  width?: number | 'auto' | `${number}%`;
  maxHeight?: number | 'auto' | `${number}%`;
  minHeight?: number | 'auto' | `${number}%`;
  maxWidth?: number | 'auto' | `${number}%`;
  minWidth?: number | 'auto' | `${number}%`;
  radius?: number;
  topLeftRadius?: number;
  topRightRadius?: number;
  bottomLeftRadius?: number;
  bottomRightRadius?: number;
  overflow?: 'visible' | 'hidden' | 'scroll';
  borderTopWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderRightWidth?: number;
  borderTopColor?: string;
  borderBottomColor?: string;
  borderLeftColor?: string;
  borderRightColor?: string;
  borderWidth?: number;
  borderColor?: string;
  gap?: number;
  style?: StyleProp<ViewStyle>;
}

const Box = forwardRef(
  (
    {
      children,
      fill,
      flex,
      align,
      flexWrap,
      justify,
      center,
      reverse,
      alignSelf,
      row,
      style,
      paddingBottom,
      paddingHorizontal,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingVertical,
      marginBottom,
      marginHorizontal,
      marginLeft,
      marginRight,
      marginTop,
      marginVertical,
      backgroundColor,
      height,
      maxHeight,
      minHeight,
      maxWidth,
      minWidth,
      width,
      opacity,
      radius,
      topLeftRadius,
      topRightRadius,
      bottomLeftRadius,
      bottomRightRadius,
      overflow,
      borderBottomColor,
      borderBottomWidth,
      borderLeftColor,
      borderLeftWidth,
      borderRightColor,
      borderRightWidth,
      borderTopColor,
      borderTopWidth,
      borderColor,
      borderWidth,
      gap,
      ...restProps
    }: BoxProps,
    ref: React.ForwardedRef<View>,
  ) => {
    return (
      <View
        {...restProps}
        ref={ref}
        style={
          [
            style,
            row
              ? reverse
                ? Layout.rowReverse
                : Layout.row
              : reverse
              ? Layout.columnReverse
              : Layout.column,
            center && Layout.center,
            fill && Layout.fill,
            flex && {flex},
            opacity && {opacity},
            height && {
              height: typeof height === 'string' ? height : height,
            },
            width && {
              width: typeof width === 'string' ? width : width,
            },
            maxHeight && {
              maxHeight: typeof maxHeight === 'string' ? maxHeight : maxHeight,
            },
            minHeight && {
              minHeight: typeof minHeight === 'string' ? minHeight : minHeight,
            },
            maxWidth && {
              maxWidth: typeof maxWidth === 'string' ? maxWidth : maxWidth,
            },
            minWidth && {
              minWidth: typeof minWidth === 'string' ? minWidth : minWidth,
            },
            backgroundColor && {backgroundColor},
            align && {alignItems: align},
            justify && {justifyContent: justify},
            alignSelf && {alignSelf},
            flexWrap && {flexWrap},
            radius && {borderRadius: radius},
            overflow && {overflow},
            topLeftRadius && {
              borderTopLeftRadius: topLeftRadius,
            },
            topRightRadius && {
              borderTopRightRadius: topRightRadius,
            },
            bottomLeftRadius && {
              borderBottomLeftRadius: bottomLeftRadius,
            },
            bottomRightRadius && {
              borderBottomRightRadius: bottomRightRadius,
            },
            paddingBottom && {
              paddingBottom: paddingBottom,
            },
            paddingLeft && {paddingLeft: paddingLeft},
            paddingRight && {paddingRight: paddingRight},
            paddingTop && {paddingTop: paddingTop},
            paddingHorizontal && {
              paddingHorizontal: paddingHorizontal,
            },
            paddingVertical && {
              paddingVertical: paddingVertical,
            },
            marginBottom && {marginBottom: marginBottom},
            marginLeft && {marginLeft: marginLeft},
            marginRight && {marginRight: marginRight},
            marginTop && {marginTop: marginTop},
            marginHorizontal && {
              marginHorizontal: marginHorizontal,
            },
            marginVertical && {
              marginVertical: marginVertical,
            },
            borderTopWidth && {
              borderTopWidth: borderTopWidth,
            },
            borderBottomWidth && {
              borderBottomWidth: borderBottomWidth,
            },
            borderLeftWidth && {
              borderLeftWidth: borderLeftWidth,
            },
            borderRightWidth && {
              borderRightWidth: borderRightWidth,
            },
            borderTopColor && {borderTopColor},
            borderBottomColor && {borderBottomColor},
            borderLeftColor && {borderLeftColor},
            borderRightColor && {borderRightColor},
            borderColor && {borderColor},
            borderWidth && {borderWidth: borderWidth},
            gap && {gap: gap},
          ] as any
        }>
        {children}
      </View>
    );
  },
);

export default memo(Box);
