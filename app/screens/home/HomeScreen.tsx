import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Alert,
  Button,
  TextInput,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import TurboImage from 'react-native-turbo-image';
import StackHeader from '@/navigation/header/StackHeader';
import Constant from '@/controller/Constant';
import {Box, Container} from '@/components';
import TRTCCloud, {
  TRTCCloudDef,
  TRTCCloudListener,
  TRTCParams,
  TXVideoView,
} from 'trtc-react-native';
import {demoParamsGroup} from './DemoParamsGroup';

// @ts-ignore
import getLatestUserSig from '@/controller/debug/index';
// @ts-ignore
import {SDKAPPID} from '@/controller/debug/Config';

const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const HomeScreen = () => {
  const scrollY = useSharedValue(0);
  const prevScrollY = useSharedValue(0);
  const isScrollingUp = useSharedValue(false);
  const [meetId, setMeetId] = React.useState('6868');
  const [userId, setUserId] = React.useState('');
  const [isEnter, setIsEnter] = useState(false);
  const [remoteUserId, setRemoteUserId] = useState(null);
  const [remoteVideo, setRemoteVideo] = useState(false);
  const [remoteSub, setRemoteSub] = useState(false);
  React.useEffect(() => {
    initInfo();
    return () => {
      console.log('destroy');
      const trtcCloud = TRTCCloud.sharedInstance();
      trtcCloud.unRegisterListener(onRtcListener);
    };
  }, []);

  async function initInfo() {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS
          .RECORD_AUDIO as 'android.permission.RECORD_AUDIO',
        PermissionsAndroid.PERMISSIONS.CAMERA as 'android.permission.CAMERA',
      ]);
    }
    const trtcCloud = TRTCCloud.sharedInstance();
    trtcCloud.registerListener(onRtcListener);
  }

  function onRtcListener(type: TRTCCloudListener, params: any) {
    if (type === TRTCCloudListener.onEnterRoom) {
      console.log('==onEnterRoom');
      if (params.result > 0) {
        setIsEnter(true);
      }
    }
    if (type === TRTCCloudListener.onExitRoom) {
      setIsEnter(false);
      setRemoteUserId(null);
    }
    if (type === TRTCCloudListener.onRemoteUserEnterRoom) {
      setRemoteUserId(params.userId);
    }
    if (type === TRTCCloudListener.onRemoteUserLeaveRoom) {
      setRemoteUserId(null);
    }
    if (type === TRTCCloudListener.onUserVideoAvailable) {
      setRemoteVideo(params.available);
    }
    if (type === TRTCCloudListener.onUserSubStreamAvailable) {
      setRemoteSub(params.available);
    }
    if (
      type !== TRTCCloudListener.onNetworkQuality &&
      type !== TRTCCloudListener.onStatistics
    ) {
      console.log(type, params);
    }
  }

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
    <Container
      disablePadding
      disableBottom
      style={styles.container}
      statusBarProps={{
        barStyle: 'light-content',
      }}>
      <StackHeader headerStyle={headerStyle} isBack={false} />
      <Animated.FlatList
        contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT}}
        data={[1, 2, 3, 4]}
        renderItem={({item}) => (
          <Box>
            <Text>{item}</Text>
          </Box>
        )}
        keyExtractor={(item, index) => index.toString()}
        onScroll={scrollHandler}
      />
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={text => setMeetId(text)}
        value={meetId}
        placeholder="Please enter the room ID"
      />
      <TextInput
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginTop: 10,
          marginBottom: 10,
        }}
        onChangeText={text => setUserId(text)}
        value={userId}
        placeholder="Please enter the user ID"
      />
      <View style={styles.fixToText}>
        <Button
          title="Enter the room"
          onPress={() => {
            if (!SDKAPPID) {
              Alert.alert('Please configure SDKAppid information');
              return;
            }
            if (!meetId || !userId) {
              Alert.alert('Please enter the room ID and user ID');
              return;
            }
            const userSig = getLatestUserSig(userId).userSig;
            const params = new TRTCParams({
              sdkAppId: SDKAPPID,
              userId,
              userSig,
              roomId: Number(meetId),
            });
            const trtcCloud = TRTCCloud.sharedInstance();
            trtcCloud.enterRoom(params, TRTCCloudDef.TRTC_APP_SCENE_VIDEOCALL);
            // trtcCloud.startLocalAudio(TRTCCloudDef.TRTC_AUDIO_QUALITY_SPEECH);
          }}
        />
        <Button
          title="Exit the room"
          onPress={() => {
            const trtcCloud = TRTCCloud.sharedInstance();
            trtcCloud.exitRoom();
          }}
        />
      </View>
      {isEnter && (
        <TXVideoView.LocalView
          style={styles.video}
          renderParams={{
            rotation: TRTCCloudDef.TRTC_VIDEO_ROTATION_0,
          }}
        />
      )}
      {remoteUserId && remoteVideo && (
        <TXVideoView.RemoteView
          userId={remoteUserId}
          viewType={TRTCCloudDef.TRTC_VideoView_SurfaceView}
          streamType={TRTCCloudDef.TRTC_VIDEO_STREAM_TYPE_BIG}
          renderParams={{
            rotation: TRTCCloudDef.TRTC_VIDEO_ROTATION_90,
          }}
          style={styles.video}
        />
      )}
      {remoteUserId && remoteSub && (
        <TXVideoView.RemoteView
          userId={remoteUserId}
          viewType={TRTCCloudDef.TRTC_VideoView_SurfaceView}
          streamType={TRTCCloudDef.TRTC_VIDEO_STREAM_TYPE_SUB}
          style={styles.video}
        />
      )}
      <ScrollView style={styles.scrollView}>
        {demoParamsGroup.map(value => {
          return (
            <Button
              title={value.title}
              key={value.title}
              onPress={() => {
                value.handler();
              }}
            />
          );
        })}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    overflow: 'hidden',
  },
  image: {
    width: Constant.screen.width - 40,
    height: Constant.screen.width / 2,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  video: {
    width: '100%',
    height: '50%',
  },
});

export default HomeScreen;
