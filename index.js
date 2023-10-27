/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
// import { initializeApp } from '@react-native-firebase/app';

// const firebaseConfig = {
//   apiKey: 'AIzaSyD-2LsA8M2_QHAwZFCUlISGoDSMbnqiRqI',
//   authDomain: 'dummy.firebaseapp.com',
//   projectId: 'dummy-cd4c1',
//   storageBucket: 'gs://dummy-cd4c1.appspot.com/',
//   appId:'1:951420322464:android:452a2aa37ce01052bfffc5'
// };

// initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);
