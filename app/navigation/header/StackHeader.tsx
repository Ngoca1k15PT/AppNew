import Animated from 'react-native-reanimated';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../RootNavigation';
import DrawerMenu from './DrawerMenu';
import Constant from '@/controller/Constant';

type StackHeaderProps = {
  headerStyle?: any;
  isBack?: boolean;
};

const StackHeader = ({headerStyle, isBack = true}: StackHeaderProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Animated.View style={[styles.header, headerStyle]}>
      <View style={styles.headerContent}>
        {isBack ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
        ) : (
          <Image source={Constant.images.logo} style={styles.logo} />
        )}
        <DrawerMenu />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#5e17eb',
    zIndex: 1,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerContent: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginLeft: 10,
  },
});

export default StackHeader;
