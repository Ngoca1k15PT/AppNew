import { Alert } from 'react-native';
import { SDKAPPID, SECRETKEY, EXPIRETIME } from './Config';
import LibGenerateTestUserSig from './lib-generate-test-usersig.min.js';

// a soft reminder to guide developer to configure sdkAppId/secretKey
if (SDKAPPID === 0 || SECRETKEY === '') {
  Alert.alert(
    'Please configure your account information first: SDKAPPID and SECRETKEY ' +
      '\r\n\r\nPlease configure your SDKAPPID/SECRETKEY in src/app/config.js'
  );
}

const generator = new LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);

export default function getLatestUserSig(userID:any) {
  const userSig = generator.genTestUserSig(userID);
  return {
    userSig,
    privateMapKey: 255,
  };
}

