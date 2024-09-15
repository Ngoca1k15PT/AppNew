import React, {memo, useCallback, useEffect} from 'react';
import {
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  UIManager,
  View,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {Colors} from '../../theme/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Box, Container} from '@/components';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Constant from '@/controller/Constant';
import {useDrawerStore} from '@/controller/store';

const DrawerMenu = () => {
  const [visible, setVisible] = React.useState(false);
  const navigation = useNavigation<any>();
  const {setIsOpen} = useDrawerStore();

  const MENUS = [
    {
      label: 'Home',
      route: 'HomeScreen',
      key: 'Home',
    },
    {
      label: 'Todo',
      route: 'TodoListScreen',
      key: 'Music',
    },
  ];

  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  const open = () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
  };

  const onPressMenuItem = useCallback(
    (item: any) => {
      setVisible(false);

      if (item.key == 'Setup') {
        setIsOpen(true);
      }

      if (item.route) {
        navigation?.navigate(item.route, item.routeParams);
      }
    },
    [navigation],
  );

  const insets = useSafeAreaInsets();

  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={open}
        style={{
          alignSelf: 'flex-end',
          paddingBottom: 15,
          paddingRight: 20,
          paddingTop: 10,
          paddingLeft: 30,
        }}>
        <Icon name="menu" size={30} color="#fff" />
      </TouchableOpacity>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onDismiss={() => setVisible(false)}>
        <TouchableWithoutFeedback onPress={close}>
          <View
            style={styles.container}
            onStartShouldSetResponder={event => true}
            onTouchEnd={e => {
              e.stopPropagation();
            }}>
            <ScrollView
              style={[
                styles.containerModal,
                {
                  paddingTop: 30,
                  // marginTop: HEADER_COMPONENT_HEIGHT + insets.top,
                },
              ]}
              showsVerticalScrollIndicator={false}>
              <Box
                paddingBottom={
                  20
                  // insets.bottom
                  //   ? insets.bottom + 20
                  //   : HEADER_COMPONENT_HEIGHT + insets.bottom
                }>
                {MENUS.map((item: any) => {
                  return (
                    <MenuItem
                      key={item.key}
                      item={item}
                      onPress={onPressMenuItem}
                    />
                  );
                })}
              </Box>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </React.Fragment>
  );
};

const MenuItem = memo(({item, onPress}: any) => {
  const canExpand = !!item.children?.length;
  const ani = useSharedValue(0);
  const styleRotate = useAnimatedStyle(() => ({
    transform: [{rotate: `${interpolate(ani.value, [0, 1], [0, 90])}deg`}],
  }));

  const [toggle, setToggle] = React.useState(false);

  useEffect(() => {
    ani.value = withTiming(toggle ? 1 : 0);
  }, [toggle]);

  const press = () => {
    if (canExpand) {
      setToggle(!toggle);
    } else {
      onPress(item);
    }
  };
  const pressChild = (child: any) => () => {
    onPress(child);
  };
  return (
    <Animated.View>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={press}
        activeOpacity={0.8}>
        <Text style={styles.textItem}>{item.label}</Text>
        <Animated.View style={[styleRotate]}>
          <Icon
            name="chevron-forward-outline"
            size={16}
            color={Colors.mainDark}
          />
        </Animated.View>
      </TouchableOpacity>
      {toggle && (
        <Animated.View>
          {item.children?.map((child: any) => {
            return (
              <TouchableOpacity
                style={styles.submenuItem}
                key={child.key}
                onPress={pressChild(child)}>
                <Text style={styles.textChildItem}>{child.label}</Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      )}
    </Animated.View>
  );
});

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  containerModal: {
    flex: 1,
    width: '100%',
    backgroundColor: '#2D2C2CC4',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 13,
    paddingHorizontal: 20,
    marginBottom: 7,
    borderRadius: 10,
  },
  submenuItem: {
    backgroundColor: 'white',
    paddingVertical: 13,
    paddingHorizontal: 20,
    marginBottom: 7,
    marginHorizontal: 20,
  },
  textItem: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: Constant.fonts.SVNSofia,
  },
  textChildItem: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: Constant.fonts.SVNSofia,
  },
});

export default React.memo(DrawerMenu);
