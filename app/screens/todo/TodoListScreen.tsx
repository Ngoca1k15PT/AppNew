import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Box, Container} from '@/components';
import StackHeader from '@/navigation/header/StackHeader';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {SpeedDial} from '@rneui/themed';
import Constant from '@/controller/Constant';
// import TodoListController from './TodoListController';
import ItemTodo from './elements/ItemTodo';
import GlobalModal, {
  hideGlobalModal,
  showGlobalModal,
} from '@/modal/GlobalModal';
import ModalAdd from './elements/ModalAdd';

const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const TodoListScreen = () => {
  const scrollY = useSharedValue(0);
  const prevScrollY = useSharedValue(0);
  const isScrollingUp = useSharedValue(false);

  // const {data, open, setOpen} = TodoListController();

  const scrollHandler = useAnimatedScrollHandler(event => {
    const currentScrollY = event.contentOffset.y;
    isScrollingUp.value = currentScrollY < prevScrollY.value;
    prevScrollY.value = currentScrollY;
    scrollY.value = currentScrollY;
  });

  const headerStyle = useAnimatedStyle(() => {
    const translateY = withTiming(
      isScrollingUp.value
        ? 0
        : interpolate(
            scrollY.value,
            [0, HEADER_SCROLL_DISTANCE],
            [0, -HEADER_SCROLL_DISTANCE],
            'clamp',
          ),
    );
    return {
      transform: [{translateY}],
    };
  });
  return (
    <View style={styles.container}>
      <StackHeader headerStyle={headerStyle} isBack={false} />
      {/* <Animated.FlatList
        contentContainerStyle={{
          paddingTop: HEADER_MAX_HEIGHT,
          marginHorizontal: 10,
          paddingBottom: 100,
        }}
        ListHeaderComponent={<Text style={styles.title}>To Day</Text>}
        data={data}
        renderItem={({item}) => <ItemTodo data={item} />}
        keyExtractor={index => index.toString()}
        onScroll={scrollHandler}
      /> */}

      {/* <SpeedDial
        isOpen={open}
        icon={{name: 'edit', color: '#fff'}}
        openIcon={{name: 'close', color: '#fff'}}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}>
        <SpeedDial.Action
          icon={{name: 'add', color: '#fff'}}
          title="Add"
          onPress={() => {
            setOpen(!open);
            showGlobalModal({Component: ModalAdd});
          }}
        />
        <SpeedDial.Action
          icon={{name: 'edit', color: '#fff'}}
          title="Edit"
          onPress={() => {
            setOpen(!open);
            // navigation.navigate('AppNavigation', {
            //   screen: 'AnalisicImageScreen',
            // });
          }}
        />
      </SpeedDial> */}
      <GlobalModal />
    </View>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    color: 'black',
    fontSize: 30,
    fontFamily: Constant.fonts.AlmonteRegular,
    marginBottom: 10,
  },
});
