import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Video, {ResizeMode} from 'react-native-video';
import {Box, Container} from '@/components';
import LoginController from './LoginController';
import Constant from '@/controller/Constant';

const LoginScreen = () => {
  const logoOpacity = useSharedValue(0);
  const formOpacity = useSharedValue(0);

  const {handleLogin} = LoginController();

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(logoOpacity.value, {duration: 500}),
      transform: [{scale: withTiming(logoOpacity.value, {duration: 500})}],
    };
  });

  const formStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(formOpacity.value, {duration: 500}),
      transform: [{translateY: withTiming(formOpacity.value, {duration: 500})}],
    };
  });

  React.useEffect(() => {
    logoOpacity.value = 1;
    formOpacity.value = 1;
  }, []);

  return (
    <Container
      disablePadding
      disableBottom
      style={styles.container}
      statusBarProps={{
        barStyle: 'light-content',
      }}>
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <Image source={Constant.images.logo} style={styles.logo} />
      </Animated.View>
      <Animated.View style={[styles.formContainer, formStyle]}>
        <Text style={styles.title}>Login</Text>
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>
      <Video
        source={require('@/assets/videos/videoBG.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode={ResizeMode.COVER}
        repeat={true}
        muted
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
    zIndex: 99,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  formContainer: {
    width: '80%',
    backgroundColor: '#fef8ec',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 99,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    height: 48,
    borderColor: 'gray',
    borderWidth: 1.5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    height: 42,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  absoluteFill: {
    // position: 'absolute',
    zIndex: -1,
  },
});

export default LoginScreen;
