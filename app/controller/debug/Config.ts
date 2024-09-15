/*eslint-disable*/
/**
   * Tencent Cloud `SDKAppID`. Set it to the `SDKAppID` of your account.
   *
   * You can view your `SDKAppID` after creating an application in the [TRTC console](https://console.trtc.io/).
   * `SDKAppID` uniquely identifies a Tencent Cloud account.
   */
const SDKAPPID:number = 20011215;

/**
   * Signature validity period, which should not be set too short
   * <p>
   * Unit: second
   * Default value: 604800 (7 days)
   */
const EXPIRETIME = 604800;

/**
 * Follow the steps below to obtain the key required for UserSig calculation.
 *
 * Step 1. Log in to the [TRTC console](https://console.trtc.io/), and create an application if you don’t have one.
 * Step 2. Find your application, click “Application Info”, and click the “Quick Start” tab.
 * Step 3. Copy and paste the key to the code, as shown below.
 *
 * Note: this method is for testing only. Before commercial launch, please migrate the UserSig calculation code and key to your backend server to prevent key disclosure and traffic stealing.
 * Reference: https://trtc.io/document/35166
 */
const SECRETKEY:string = 'fa3cbb2209b367a809dbc6126689c69b2ad9ef0a4ba1bc69a04222efbdfd391c';

export { SDKAPPID, EXPIRETIME, SECRETKEY };